import { useResume } from "../../context/ResumeContext";
import CollapsibleSection from "../CollapsibleSection";

const SummarySection = () => {
    const { resume, updateSectionContent } = useResume();

    console.log(resume);


    const summarySection = resume.sections.find(
        (sec) => sec.type === "summary"
    );

    const summary = summarySection?.content || {};
    const handleChange = (field, value) => {
        updateSectionContent("summary", field, value);
    };

    return (
        <CollapsibleSection title="Professional Summary" defaultOpen={false}>
            <div className="space-y-4">

                {/* SUMMARY */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Professional Summary
                    </label>
                    <textarea
                        value={summary.text || ""}
                        onChange={(e) => handleChange("text", e.target.value)}
                        className="w-full p-2 border rounded min-h-[120px]"
                        placeholder="Brief professional summary..."
                    />
                </div>

            </div>
        </CollapsibleSection>
    );
};

export default SummarySection;

/* ---------- SMALL INPUT COMPONENT ---------- */

const Input = ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    className = "",
}) => (
    <div className={className}>
        <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
    </div>
);
