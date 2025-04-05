import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { 
  Upload, 
  File, 
  Trash2, 
  Search, 
  Database, 
  AlertCircle, 
  CheckCircle,
  ArrowLeft,
  BarChart
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  uploadStudyMaterial, 
  getStudyMaterialsByClass,
  deleteStudyMaterial, 
  updateMaterialIndexStatus 
} from '../../firebase/storage';
import { indexDocumentForRag } from '../../firebase/rag';
import DashboardHeader from '../shared/DashboardHeader';

const StudyMaterialsManager = () => {
  const { classId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [materials, setMaterials] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [selectedClass, setSelectedClass] = useState({
    id: classId,
    name: "Loading class details..."
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [isIndexing, setIsIndexing] = useState({});

  // Mock class data (replace with actual API call)
  const mockClassData = {
    id: classId,
    name: "Advanced Physics 301",
    description: "A comprehensive study of classical and quantum mechanics"
  };

  useEffect(() => {
    fetchMaterials();
    // In a real app, fetch the class details
    setSelectedClass(mockClassData);
  }, [classId]);

  const fetchMaterials = async () => {
    try {
      setIsLoading(true);
      const fetchedMaterials = await getStudyMaterialsByClass(classId);
      setMaterials(fetchedMaterials);
    } catch (err) {
      setError("Failed to load study materials. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = async (event) => {
    const files = event.target.files;
    
    if (!files.length) return;
    
    try {
      setIsUploading(true);
      setError(null);
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Set fake progress updates
        const progressInterval = setInterval(() => {
          setUploadProgress(prev => {
            const newProgress = prev + 10;
            return newProgress > 90 ? 90 : newProgress;
          });
        }, 300);
        
        await uploadStudyMaterial(file, {
          classId: selectedClass.id,
          className: selectedClass.name,
          instructorId: currentUser.uid,
          description: `Study material for ${selectedClass.name}`,
          tags: ["study", "material"]
        });
        
        clearInterval(progressInterval);
        setUploadProgress(100);
        
        // Reset progress after showing 100%
        setTimeout(() => setUploadProgress(0), 1000);
      }
      
      setSuccess("Materials uploaded successfully!");
      fetchMaterials(); // Refresh the list
    } catch (err) {
      setError("Failed to upload materials. Please try again.");
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (material) => {
    if (!window.confirm(`Are you sure you want to delete ${material.fileName}?`)) {
      return;
    }
    
    try {
      await deleteStudyMaterial(material.id, material.filePath);
      setSuccess("Material deleted successfully");
      setMaterials(materials.filter(m => m.id !== material.id));
    } catch (err) {
      setError("Failed to delete material. Please try again.");
      console.error(err);
    }
  };

  const handleIndexForRag = async (material) => {
    try {
      setIsIndexing(prev => ({ ...prev, [material.id]: true }));
      
      await indexDocumentForRag(material.id, material.downloadURL, material.fileName);
      await updateMaterialIndexStatus(material.id, true);
      
      // Update the local state
      setMaterials(materials.map(m => 
        m.id === material.id ? { ...m, indexed: true } : m
      ));
      
      setSuccess(`${material.fileName} indexed successfully for RAG!`);
    } catch (err) {
      setError("Failed to index document. Please try again.");
      console.error(err);
    } finally {
      setIsIndexing(prev => ({ ...prev, [material.id]: false }));
    }
  };

  // Filter materials based on search
  const filteredMaterials = searchTerm 
    ? materials.filter(m => 
        m.fileName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.description.toLowerCase().includes(searchTerm.toLowerCase()))
    : materials;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <DashboardHeader userRole="instructor" />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <button
              onClick={() => navigate('/instructor')}
              className="text-indigo-600 hover:text-indigo-800 mb-2 flex items-center"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Dashboard
            </button>
            <h1 className="text-3xl font-bold text-indigo-900">Study Materials Manager</h1>
            <p className="text-indigo-600">
              For class: {selectedClass.name}
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Link
              to={`/instructor/rag-analytics/${classId}`}
              className="text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-md transition duration-300 font-medium flex items-center"
            >
              <BarChart className="mr-2 h-5 w-5" />
              View Analytics
            </Link>
            <label className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 font-medium flex items-center cursor-pointer">
              <Upload className="mr-2 h-5 w-5" />
              Upload Materials
              <input 
                type="file" 
                multiple 
                onChange={handleFileUpload} 
                className="hidden" 
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt"
                disabled={isUploading}
              />
            </label>
          </div>
        </div>
        
        {/* Progress bar for uploads */}
        {uploadProgress > 0 && (
          <div className="mb-6">
            <div className="w-full bg-indigo-100 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-indigo-600 mt-1">
              {uploadProgress < 100 ? 'Uploading...' : 'Upload complete!'}
            </p>
          </div>
        )}
        
        {/* Status messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-md flex items-center">
            <CheckCircle className="h-5 w-5 mr-2" />
            {success}
          </div>
        )}
        
        {/* Search bar */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search study materials..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-indigo-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white placeholder-indigo-300"
            />
          </div>
        </div>
        
        {/* Materials list */}
        <div className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden">
          <div className="p-4 border-b border-indigo-100 bg-indigo-50">
            <h2 className="text-xl font-semibold text-indigo-900">Study Materials</h2>
          </div>
          
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredMaterials.length === 0 ? (
            <div className="text-center py-12">
              <File className="h-12 w-12 text-indigo-300 mx-auto mb-3" />
              <h3 className="text-xl font-semibold text-indigo-900 mb-2">No study materials yet</h3>
              <p className="text-indigo-600 mb-4">
                Upload study materials to make them available to students
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-indigo-100">
                <thead className="bg-indigo-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                      File
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                      Size
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                      Uploaded
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                      RAG Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-indigo-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-indigo-100">
                  {filteredMaterials.map((material) => (
                    <tr key={material.id} className="hover:bg-indigo-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <File className="h-5 w-5 text-indigo-500 mr-3" />
                          <div>
                            <a 
                              href={material.downloadURL} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-900 font-medium"
                            >
                              {material.fileName}
                            </a>
                            <p className="text-xs text-indigo-500">
                              {material.fileType}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">
                        {(material.fileSize / 1024 / 1024).toFixed(2)} MB
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-indigo-600">
                        {new Date(material.uploadDate.seconds * 1000).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {material.indexed ? (
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full flex items-center w-fit">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Indexed
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full flex items-center w-fit">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Not Indexed
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {!material.indexed && (
                            <button
                              onClick={() => handleIndexForRag(material)}
                              disabled={isIndexing[material.id]}
                              className="text-indigo-600 hover:text-indigo-900 disabled:opacity-50 flex items-center"
                            >
                              {isIndexing[material.id] ? (
                                <>
                                  <div className="animate-spin h-4 w-4 border-b-2 border-indigo-600 rounded-full mr-1"></div>
                                  Indexing...
                                </>
                              ) : (
                                <>
                                  <Database className="h-4 w-4 mr-1" />
                                  Index for RAG
                                </>
                              )}
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(material)}
                            className="text-red-600 hover:text-red-900 flex items-center"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudyMaterialsManager;
