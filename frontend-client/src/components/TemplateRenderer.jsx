import { useResume } from "../context/ResumeContext";
import Modern from "./templates/Modern";
import Classic from "./templates/Classic";

const TemplateRenderer = () => {
  const { resumeData } = useResume();
  console.log("Rendering Template with data:", resumeData.template);
  
const selected = resumeData.template?.theme || "template1";


  const templates = {
    template1: <Classic />,
    template2: <Modern />,
  };

  return templates[selected] || <div>Invalid Template</div>;
};

export default TemplateRenderer;