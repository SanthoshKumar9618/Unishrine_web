export interface ProjectType {
  id: number;
  title: string;
  image: string;
  
  description: string[];
  challenge: string;
  result: string;
  
  
 
}

const project_data: ProjectType[] = [
 {
  id: 1,
  title: "AI Call Assistant",

  image: "/assets/img/bg-img/pro_1_2.png",

  description: [
    "AI Call Assistant is an advanced real-time voice automation platform designed to handle inbound and outbound customer conversations using AI-powered voice agents.",
    
    "The system integrates Speech-to-Text (STT), Large Language Models (LLM), and Text-to-Speech (TTS) to create natural human-like conversations for sales, support, appointment booking, lead qualification, and customer engagement workflows.",

    "Built with a scalable architecture using Next.js frontend and FastAPI backend, the platform supports multilingual conversations, real-time interruption handling, live transcription, analytics dashboards, and enterprise-grade call orchestration."
  ],

  challenge:
    "The major challenge was building a low-latency real-time voice pipeline where STT, LLM, and TTS work seamlessly with interruption support, dynamic language switching, and production-grade call orchestration without breaking conversation flow.",

  result:
    "Successfully delivered a production-ready AI voice calling platform capable of handling real-time intelligent conversations with low latency, multilingual support, interrupt handling, scalable backend orchestration, and seamless frontend-backend integration for live demo and enterprise deployment.",

  
},
  {
  id: 2,
  title: "Project 02",
  image: "/assets/img/bg-img/placeholder.jpg",

  description: ["Project under construction"],
  challenge: "",
  result: "",
  
 
},
{
  id: 3,
  title: "Project 03",
  image: "/assets/img/bg-img/placeholder.jpg",
 
  description: ["Project under construction"],
  challenge: "",
  result: "",
 
},
];

export default project_data;