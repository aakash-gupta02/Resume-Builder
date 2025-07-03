import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
  Image,
} from "@react-pdf/renderer";

// Style definitions
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Helvetica",
    lineHeight: 1.5,
    color: "#000",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
    textAlign: "center",
  },
  title: {
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },
  contactItem: {
    fontSize: 10,
    textAlign: "center",
    marginBottom: 4,
  },
  linkItem: {
    fontSize: 10,
    color: "blue",
    textDecoration: "none",
    marginHorizontal: 5,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    paddingBottom: 2,
    textTransform: "uppercase",
  },
  item: {
    marginBottom: 10,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  itemTitle: {
    fontWeight: "bold",
    fontSize: 12,
  },
  itemSubtitle: {
    fontSize: 10,
    marginBottom: 2,
  },
  itemDate: {
    fontSize: 10,
    fontStyle: "italic",
    color: "#333",
  },
  itemDescription: {
    fontSize: 10,
    textAlign: "justify",
  },
  bulletList: {
    marginTop: 4,
  },
  bulletItem: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bulletPoint: {
    width: 10,
    fontSize: 10,
  },
  bulletText: {
    fontSize: 10,
    flex: 1,
  },
  skillsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginTop: 6,
  },
  skillItem: {
    fontSize: 10,
    backgroundColor: "#eee",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 4,
    marginRight: 6,
    marginBottom: 6,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#000",
    alignSelf: "center",
  },
  summary: {
    fontSize: 10.5,
    textAlign: "justify",
  },
});

const MyResumePDF = ({ resumeData }) => {
  const {
    profileInfo = {},
    contactLinks = {},
    education = [],
    experience = [],
    projects = [],
    skills = {},
    certifications = [],
    hobbies = [],
    achievements = [],
    languages = [],
  } = resumeData || {};

  const {
    fullName = "",
    title = "",
    email = "",
    phone = "",
    address = "",
    summary = "",
    profileImage = "",
  } = profileInfo;

  const { website, linkedIn, github, leetcode } = contactLinks;

  return (
    <Document>
      <Page style={styles.page}>
        {/* Header */}
        <View style={{ alignItems: "center", marginBottom: 10 }}>
          {profileImage && (
            <Image src={profileImage} style={styles.profileImage} />
          )}
          <Text style={styles.name}>{fullName}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.contactItem}>
            {email} | {phone} | {address}
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center", flexWrap: "wrap", marginTop: 4 }}>
            {linkedIn && <Link src={linkedIn} style={styles.linkItem}>LinkedIn</Link>}
            {github && <Link src={github} style={styles.linkItem}>GitHub</Link>}
            {website && <Link src={website} style={styles.linkItem}>Portfolio</Link>}
            {leetcode && <Link src={leetcode} style={styles.linkItem}>LeetCode</Link>}
          </View>
        </View>

        {/* Summary */}
        {summary && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Summary</Text>
            <Text style={styles.summary}>{summary}</Text>
          </View>
        )}

        {/* Skills */}
        {(skills.technical?.length > 0 ||
          skills.soft?.length > 0 ||
          skills.tools?.length > 0 ||
          languages.length > 0) && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Skills</Text>

            {skills.technical?.length > 0 && (
              <View style={styles.item}>
                <Text style={styles.itemSubtitle}>Frontend:</Text>
                <View style={styles.skillsContainer}>
                  {skills.technical.map((skill, idx) => (
                    <Text key={idx} style={styles.skillItem}>{skill}</Text>
                  ))}
                </View>
              </View>
            )}
            {skills.tools?.length > 0 && (
              <View style={styles.item}>
                <Text style={styles.itemSubtitle}>Tools:</Text>
                <View style={styles.skillsContainer}>
                  {skills.tools.map((tool, idx) => (
                    <Text key={idx} style={styles.skillItem}>{tool}</Text>
                  ))}
                </View>
              </View>
            )}
            {skills.soft?.length > 0 && (
              <View style={styles.item}>
                <Text style={styles.itemSubtitle}>Soft Skills:</Text>
                <View style={styles.skillsContainer}>
                  {skills.soft.map((skill, idx) => (
                    <Text key={idx} style={styles.skillItem}>{skill}</Text>
                  ))}
                </View>
              </View>
            )}
            {languages.length > 0 && (
              <View style={styles.item}>
                <Text style={styles.itemSubtitle}>Languages:</Text>
                <View style={styles.skillsContainer}>
                  {languages.map((lang, idx) => (
                    <Text key={idx} style={styles.skillItem}>
                      {lang.name} ({lang.proficiency || "Native"})
                    </Text>
                  ))}
                </View>
              </View>
            )}
          </View>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Projects</Text>
            {projects.map((proj, idx) => (
              <View key={idx} style={styles.item}>
                <Text style={styles.itemTitle}>{proj.name}</Text>
                {proj.techStack && (
                  <Text style={styles.itemSubtitle}>Tech Stack: {proj.techStack}</Text>
                )}
                <View style={styles.bulletList}>
                  {proj.description
                    ?.split("•")
                    .filter(Boolean)
                    .map((point, i) => (
                      <View key={i} style={styles.bulletItem}>
                        <Text style={styles.bulletPoint}>•</Text>
                        <Text style={styles.bulletText}>{point.trim()}</Text>
                      </View>
                    ))}
                </View>
                <View style={{ flexDirection: "row", gap: 10, marginTop: 4 }}>
                  {proj.link && <Link src={proj.link} style={styles.linkItem}>Live</Link>}
                  {proj.github && <Link src={proj.github} style={styles.linkItem}>Code</Link>}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {education.map((edu, idx) => (
              <View key={idx} style={styles.item}>
                <Text style={styles.itemTitle}>
                  {edu.degree} in {edu.fieldOfStudy}
                </Text>
                <Text style={styles.itemSubtitle}>
                  {edu.institute} | CGPI: {edu.grade} | {edu.startDate} – {edu.endDate}
                </Text>
              </View>
            ))}
          </View>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Certificates</Text>
            {certifications.map((cert, idx) => (
              <Text key={idx} style={styles.itemSubtitle}>
                {cert.name}
              </Text>
            ))}
          </View>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Achievements</Text>
            <View style={styles.bulletList}>
              {achievements.map((item, idx) => (
                <View key={idx} style={styles.bulletItem}>
                  <Text style={styles.bulletPoint}>•</Text>
                  <Text style={styles.bulletText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Hobbies */}
        {hobbies.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hobbies</Text>
            <View style={styles.skillsContainer}>
              {hobbies.map((hobby, idx) => (
                <Text key={idx} style={styles.skillItem}>
                  {hobby}
                </Text>
              ))}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default MyResumePDF;
