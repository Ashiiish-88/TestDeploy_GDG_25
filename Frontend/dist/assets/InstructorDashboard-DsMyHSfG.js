import{c as b,r as a,j as e,f as k,C as h,a as A,B as f}from"./index-CGocrW-2.js";import{D as M}from"./DashboardHeader-B5PeDfLb.js";import{S as x}from"./StatCard-dJ9OuqKE.js";import{S as L}from"./SearchBar-Duk7gwUO.js";import{B as j}from"./bell-CP9XDZU-.js";import{X as $}from"./x-CKoSI4A3.js";import{D as B}from"./DashboardInitializer-oEycDYAr.js";import{U as v}from"./users-D5Ca1YqY.js";import{C as D}from"./circle-check-big-Dq-9WIkn.js";import{A as T}from"./arrow-right-D8fzX6aS.js";/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=[["polygon",{points:"22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3",key:"1yg77f"}]],_=b("Filter",E);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=[["path",{d:"M7.9 20A9 9 0 1 0 4 16.1L2 22Z",key:"vv11sd"}]],R=b("MessageCircle",F);/**
 * @license lucide-react v0.475.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const z=[["path",{d:"M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",key:"vktsd0"}],["circle",{cx:"7.5",cy:"7.5",r:".5",fill:"currentColor",key:"kqv944"}]],P=b("Tag",z),O=[{id:1,type:"deadline",title:"Assignment Deadline",message:"Your Math 101 assignment is due tomorrow",date:"1 day",read:!1},{id:2,type:"course",title:"New Course Material",message:"New lecture has been uploaded for Physics 202",date:"2 days",read:!1},{id:3,type:"message",title:"New Message",message:"You received a message from Dr. Smith",date:"3 days",read:!0}],U=()=>{const[r,l]=a.useState(!1),[n,c]=a.useState(O),d=n.filter(t=>!t.read).length,m=t=>{c(n.map(i=>i.id===t?{...i,read:!0}:i))},o=t=>{switch(t){case"deadline":return e.jsx(h,{className:"h-5 w-5 text-orange-500"});case"course":return e.jsx(k,{className:"h-5 w-5 text-green-500"});case"message":return e.jsx(R,{className:"h-5 w-5 text-blue-500"});default:return e.jsx(j,{className:"h-5 w-5 text-indigo-500"})}};return e.jsxs("div",{className:"relative",children:[e.jsxs("button",{className:"relative p-2 rounded-full hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-indigo-500",onClick:()=>l(!r),children:[e.jsx(j,{className:"h-5 w-5 text-indigo-600"}),d>0&&e.jsx("span",{className:"absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full",children:d})]}),r&&e.jsxs("div",{className:"absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-50 border border-indigo-100",children:[e.jsxs("div",{className:"flex justify-between items-center p-3 bg-indigo-50 border-b border-indigo-100",children:[e.jsx("h3",{className:"font-medium text-indigo-900",children:"Notifications"}),e.jsx("button",{className:"text-indigo-500 hover:text-indigo-700",onClick:()=>l(!1),children:e.jsx($,{className:"h-4 w-4"})})]}),e.jsx("div",{className:"max-h-96 overflow-y-auto",children:n.length>0?n.map(t=>e.jsx("div",{className:`p-3 border-b border-indigo-50 hover:bg-indigo-50 cursor-pointer ${t.read?"opacity-70":""}`,onClick:()=>m(t.id),children:e.jsxs("div",{className:"flex",children:[e.jsx("div",{className:"mr-3",children:o(t.type)}),e.jsxs("div",{className:"flex-1",children:[e.jsxs("div",{className:"flex justify-between items-start",children:[e.jsx("h4",{className:`font-medium ${t.read?"text-indigo-700":"text-indigo-900"}`,children:t.title}),e.jsx("span",{className:"text-xs text-indigo-500",children:t.date})]}),e.jsx("p",{className:"text-sm text-indigo-600 mt-1",children:t.message})]})]})},t.id)):e.jsx("div",{className:"p-4 text-center text-indigo-500",children:"No notifications"})}),n.length>0&&e.jsx("div",{className:"p-2 border-t border-indigo-100 text-center",children:e.jsx("button",{className:"text-sm text-indigo-600 hover:text-indigo-800",children:"Mark all as read"})})]})]})},q=[{id:1,name:"Standard 5",section:"A",studentCount:25,lastLecture:"2025-03-30",nextSchedule:"2025-04-05 9:00 AM",status:"active",recentActivity:"Mathematics quiz submitted by 18 students",subjects:["Mathematics","Science","English"]},{id:2,name:"Standard 6",section:"B",studentCount:20,lastLecture:"2025-03-28",nextSchedule:"2025-04-04 11:00 AM",status:"active",recentActivity:"Science assignment deadline tomorrow",subjects:["Science","Social Studies"]},{id:3,name:"Standard 5",section:"B",studentCount:22,lastLecture:"2025-03-25",nextSchedule:"2025-04-03 2:00 PM",status:"inactive",recentActivity:"No recent activity",subjects:["Mathematics","Science"]},{id:4,name:"Standard 8",section:"A",studentCount:28,lastLecture:"2025-03-29",nextSchedule:"2025-04-06 10:30 AM",status:"active",recentActivity:"English live lecture scheduled",subjects:["English","Social Studies"]}],I=()=>{const[r,l]=a.useState([]),[n,c]=a.useState(!0),[d,m]=a.useState(null),[o,t]=a.useState(""),[i,u]=a.useState("all"),p=A();a.useEffect(()=>{w()},[]);const w=async()=>{try{c(!0),await new Promise(s=>setTimeout(s,1e3)),l(q)}catch(s){m(s.message)}finally{c(!1)}},y=s=>{p(`/instructor/class/${s}`)},N=r.filter(s=>{const g=s.name.toLowerCase().includes(o.toLowerCase())||s.section.toLowerCase().includes(o.toLowerCase()),S=i==="all"||s.status===i;return g&&S}),C=r.reduce((s,g)=>s+g.studentCount,0);return e.jsx(B,{expectedRole:"teacher",children:e.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-indigo-50 to-white",children:[e.jsx(M,{userRole:"teacher"}),e.jsxs("main",{className:"container mx-auto px-4 py-8",children:[e.jsxs("div",{className:"flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-bold text-indigo-900",children:"Assigned Classes"}),e.jsx("p",{className:"text-indigo-600 mt-2",children:"Manage your assigned standards and sections"})]}),e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx(L,{placeholder:"Search classes...",value:o,onChange:t}),e.jsx(U,{})]})]}),e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-4 gap-6 mb-8",children:[e.jsx(x,{icon:e.jsx(f,{className:"h-6 w-6 text-indigo-600"}),title:"Assigned Classes",value:r.length,bgColor:"bg-indigo-100",textColor:"text-indigo-700"}),e.jsx(x,{icon:e.jsx(v,{className:"h-6 w-6 text-purple-600"}),title:"Total Students",value:C,bgColor:"bg-purple-100",textColor:"text-purple-700"}),e.jsx(x,{icon:e.jsx(h,{className:"h-6 w-6 text-blue-600"}),title:"Sessions This Week",value:"12",bgColor:"bg-blue-100",textColor:"text-blue-700"}),e.jsx(x,{icon:e.jsx(D,{className:"h-6 w-6 text-green-600"}),title:"Completed Sessions",value:"24",bgColor:"bg-green-100",textColor:"text-green-700"})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-4 mb-6",children:[e.jsxs("div",{className:"flex items-center mr-4",children:[e.jsx(_,{className:"h-5 w-5 text-indigo-600 mr-2"}),e.jsx("span",{className:"text-indigo-900 font-medium",children:"Filter:"})]}),e.jsx("button",{className:`px-4 py-2 rounded-full text-sm font-medium ${i==="all"?"bg-indigo-600 text-white":"bg-indigo-100 text-indigo-700 hover:bg-indigo-200"}`,onClick:()=>u("all"),children:"All Classes"}),e.jsx("button",{className:`px-4 py-2 rounded-full text-sm font-medium ${i==="active"?"bg-indigo-600 text-white":"bg-indigo-100 text-indigo-700 hover:bg-indigo-200"}`,onClick:()=>u("active"),children:"Active"}),e.jsx("button",{className:`px-4 py-2 rounded-full text-sm font-medium ${i==="inactive"?"bg-indigo-600 text-white":"bg-indigo-100 text-indigo-700 hover:bg-indigo-200"}`,onClick:()=>u("inactive"),children:"Inactive"})]}),n?e.jsx("div",{className:"flex items-center justify-center h-64",children:e.jsx("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"})}):d?e.jsx("div",{className:"bg-red-50 text-red-600 p-4 rounded-lg",children:d}):N.length===0?e.jsxs("div",{className:"bg-white p-6 rounded-xl shadow-sm border border-indigo-100 text-center",children:[e.jsx(f,{className:"h-12 w-12 text-indigo-300 mx-auto mb-3"}),e.jsx("h3",{className:"text-xl font-semibold text-indigo-900 mb-2",children:"No classes found"}),e.jsx("p",{className:"text-indigo-600 mb-4",children:"Try adjusting your search or filters"})]}):e.jsx("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",children:N.map(s=>e.jsx("div",{className:`bg-white rounded-xl shadow-sm border ${s.status==="active"?"border-indigo-200":"border-gray-200"} hover:shadow-md transition-all duration-300 overflow-hidden`,children:e.jsxs("div",{className:"p-6",children:[e.jsxs("div",{className:"flex justify-between items-start mb-4",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-xl font-bold text-indigo-900",children:s.name}),e.jsxs("p",{className:"text-indigo-600",children:["Section ",s.section]})]}),e.jsx("div",{className:`px-3 py-1 rounded-full text-xs font-medium ${s.status==="active"?"bg-green-100 text-green-800":"bg-gray-100 text-gray-800"}`,children:s.status==="active"?"Active":"Inactive"})]}),e.jsxs("div",{className:"space-y-3 mb-5",children:[e.jsxs("div",{className:"flex items-center",children:[e.jsx(v,{className:"h-4 w-4 text-indigo-600 mr-2"}),e.jsxs("span",{className:"text-indigo-800",children:[s.studentCount," Students"]})]}),e.jsxs("div",{className:"flex items-start",children:[e.jsx(P,{className:"h-4 w-4 text-indigo-600 mr-2 mt-1 flex-shrink-0"}),e.jsx("span",{className:"text-indigo-800",children:s.subjects.join(", ")})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx(h,{className:"h-4 w-4 text-indigo-600 mr-2"}),e.jsxs("span",{className:"text-indigo-800",children:["Next: ",new Date(s.nextSchedule).toLocaleDateString("en-US",{month:"short",day:"numeric",hour:"2-digit",minute:"2-digit"})]})]}),e.jsxs("div",{className:"flex items-start",children:[e.jsx(j,{className:"h-4 w-4 text-indigo-600 mr-2 mt-1 flex-shrink-0"}),e.jsx("span",{className:"text-indigo-800",children:s.recentActivity})]})]}),e.jsxs("button",{onClick:()=>y(s.id),className:"w-full py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-300 font-medium flex items-center justify-center",children:["Go to Classroom",e.jsx(T,{className:"ml-2 h-4 w-4"})]})]})},s.id))})]})]})})};export{I as default};
