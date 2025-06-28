import { useResume } from "../../context/ResumeContext";

const CertificationsSection = () => {
  const { resumeData, setResumeData } = useResume();

  const handleChange = (index, e) => {
    const updated = [...resumeData.certifications];
    updated[index][e.target.name] = e.target.value;
    setResumeData({ ...resumeData, certifications: updated });
  };

  const addCertification = () => {
    setResumeData({
      ...resumeData,
      certifications: [...resumeData.certifications, {
        name: '', issuer: '', date: '', credentialId: '', credentialUrl: ''
      }],
    });
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Certifications</h2>
      {resumeData.certifications.map((cert, index) => (
        <div key={index} className="space-y-2">
          <input name="name" value={cert.name} onChange={(e) => handleChange(index, e)} placeholder="Name" className="input" />
          <input name="issuer" value={cert.issuer} onChange={(e) => handleChange(index, e)} placeholder="Issuer" className="input" />
          <input name="date" value={cert.date} onChange={(e) => handleChange(index, e)} placeholder="Date" className="input" />
          <input name="credentialId" value={cert.credentialId} onChange={(e) => handleChange(index, e)} placeholder="Credential ID" className="input" />
          <input name="credentialUrl" value={cert.credentialUrl} onChange={(e) => handleChange(index, e)} placeholder="Credential URL" className="input" />
        </div>
      ))}
      <button onClick={addCertification} className="btn">+ Add Certification</button>
    </div>
  );
};
export default CertificationsSection;
