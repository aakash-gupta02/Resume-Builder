import resume from "../models/resumeModel";

export const createResume = async (req, res) => {
  try {
    const { title } = req.body;

    // default resume.....
    const defaultResumeData = {
      title: "",
      thumbnailLink: "",

      template: {
        theme: "",
        colorPalate: [],
      },

      profileInfo: {
        fullName: "",
        title: "",
        email: "",
        phone: "",
        address: "",
        summary: "",
        profileImage: "",
      },

      contactLinks: {
        website: "",
        linkedIn: "",
        github: "",
        leetcode: "",
      },

      education: [
        {
          institute: "",
          degree: "",
          fieldOfStudy: "",
          startDate: "",
          endDate: "",
          grade: "",
          description: "",
        },
      ],

      experience: [
        {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          location: "",
          description: "",
        },
      ],

      projects: [
        {
          name: "",
          description: "",
          techStack: [],
          link: "",
          github: "",
        },
      ],

      skills: {
        technical: [],
        soft: [],
        tools: [],
        languages: [],
      },

      certifications: [
        {
          name: "",
          issuer: "",
          date: "",
          credentialId: "",
          credentialUrl: "",
        },
      ],

      hobbies: [""],

      achievements: [""],

      languages: [
        {
          name: "",
          progress: 0,
        },
      ],
    };

    const newResume = await resume.create({
      userId: req.body._id,
      title,
      ...defaultResumeData,
      ...req.body,
    });

    res.status(200).json({ message: "Created Successfully", newResume });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};

export const getResume = async (req, res) => {
  try {
    const allResume = await resume.find({ userId: req.user._id });

    res.status(200).json({ allResume });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
  }
};


export const oneResume = async (req,res) =>{
    const {id} = req.params
    try {
       const resume1 = await resume.findById({id})

       res.status(200).json(resume1)
    } catch (error) {
            console.log(error);
    res.status(400).json({ message: "Internal Server Error" });
    }
}
