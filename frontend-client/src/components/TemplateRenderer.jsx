import { useResume } from "../context/ResumeContext";
import { TEMPLATES, DEFAULT_TEMPLATE } from "./templates/index";

const TemplateRenderer = () => {
  const { resumeData } = useResume();
  
  // Use the same key as defined in TEMPLATES ('classic' not 'template1')
  const selected = resumeData.template?.theme || DEFAULT_TEMPLATE;
  
  // Safely get the component
  const TemplateComponent = TEMPLATES[selected]?.component;

  if (!TemplateComponent) {
    console.error(`Template "${selected}" not found. Falling back to default.`);
    const DefaultComponent = TEMPLATES[DEFAULT_TEMPLATE].component;
    return <DefaultComponent />;
  }

  return <TemplateComponent />;
};

export default TemplateRenderer;