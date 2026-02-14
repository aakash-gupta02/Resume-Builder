'use client';

import { useMemo } from 'react';
import { useResume } from '@/context/ResumeContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github, 
  Twitter,
  ExternalLink,
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Code,
  Languages as LanguagesIcon,
  Star,
  Heart
} from 'lucide-react';
import Image from 'next/image';

export default function ResumePreview() {
  const { resume, customization } = useResume();
  const sections = resume?.sections || [];

  // Generate dynamic styles based on customization
  const styles = useMemo(() => {
    const colors = customization.colors || {};
    const typography = customization.typography || {};
    const spacing = customization.spacing || {};
    const layout = customization.layout || {};
    const sectionStyles = customization.sectionStyles || {};
    const options = customization.options || {};

    return {
      page: {
        backgroundColor: colors.background || '#ffffff',
        color: colors.text || '#1f2937',
        fontFamily: typography.bodyFont || 'Inter',
        fontSize: `${typography.baseFontSize || 14}px`,
        lineHeight: typography.lineHeight || 1.5,
        letterSpacing: `${typography.letterSpacing || 0}em`,
        padding: `${spacing.pageMargin || 40}px`,
        minHeight: '100%',
      },
      heading: {
        fontFamily: typography.headingFont || 'Inter',
        color: colors.heading || '#111827',
        fontSize: `${(typography.baseFontSize || 14) * (typography.headingSizeScale || 1.2)}px`,
        textTransform: options.capitalizeHeadings ? 'uppercase' : 'none',
        letterSpacing: options.capitalizeHeadings ? '0.05em' : 'inherit',
      },
      sectionHeading: getSectionHeadingStyle(sectionStyles, colors),
      primary: colors.primary || '#2563eb',
      accent: colors.accent || '#3b82f6',
      sectionGap: spacing.sectionGap || 24,
      itemGap: spacing.itemGap || 16,
      contentPadding: spacing.contentPadding || 16,
      borderRadius: sectionStyles.borderRadius || 8,
      showDividers: sectionStyles.showDividers,
      dividerStyle: sectionStyles.dividerStyle || 'solid',
      border: colors.border || '#e2e8f0',
      sectionBg: colors.sectionBg || '#f8fafc',
    };
  }, [customization]);

  // Get visible sections in order
  const visibleSections = useMemo(() => {
    return sections
      .filter(s => s.visible)
      .sort((a, b) => a.order - b.order);
  }, [sections]);

  // Get section data
  const getSection = (type) => sections.find(s => s.type === type);
  const profile = getSection('profile');
  const summary = getSection('summary');

  const layoutType = customization.layout?.columns || 'single';
  const isMultiColumn = layoutType !== 'single';

  return (
    <div 
      className="resume-preview w-full h-full overflow-auto"
      style={styles.page}
    >
      {/* Header / Profile Section */}
      {profile?.visible && (
        <Header 
          profile={profile} 
          customization={customization} 
          styles={styles} 
        />
      )}

      {/* Summary Section */}
      {summary?.visible && summary?.content?.text && (
        <Section title="Professional Summary" styles={styles} icon={<Star className="w-4 h-4" />}>
          <p className="whitespace-pre-wrap">{summary.content.text}</p>
        </Section>
      )}

      {/* Main Content */}
      {isMultiColumn ? (
        <MultiColumnLayout 
          sections={visibleSections} 
          customization={customization} 
          styles={styles} 
        />
      ) : (
        <SingleColumnLayout 
          sections={visibleSections} 
          styles={styles} 
          customization={customization}
        />
      )}
    </div>
  );
}

// Section Heading Style Generator
function getSectionHeadingStyle(sectionStyles, colors) {
  const headingStyle = sectionStyles.headingStyle || 'underline';
  const primary = colors.primary || '#2563eb';
  const heading = colors.heading || '#111827';

  const baseStyle = {
    marginBottom: '12px',
    paddingBottom: '8px',
    fontWeight: '600',
  };

  switch (headingStyle) {
    case 'underline':
      return { ...baseStyle, borderBottom: `2px solid ${primary}` };
    case 'background':
      return { ...baseStyle, backgroundColor: `${primary}15`, padding: '8px 12px', borderRadius: '4px' };
    case 'border-left':
      return { ...baseStyle, borderLeft: `4px solid ${primary}`, paddingLeft: '12px' };
    case 'border-bottom':
      return { ...baseStyle, borderBottom: `1px solid ${colors.border || '#e2e8f0'}` };
    case 'uppercase':
      return { ...baseStyle, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85em' };
    default:
      return baseStyle;
  }
}

// Header Component
function Header({ profile, customization, styles }) {
  const layout = customization.layout || {};
  const headerStyle = layout.headerStyle || 'classic';
  const showPhoto = layout.showPhoto ?? true;
  const photoStyle = layout.photoStyle || 'rounded';
  const photoSize = layout.photoSize || 100;
  const contactStyle = layout.contactStyle || 'inline';
  const options = customization.options || {};

  const photoRadius = photoStyle === 'circle' ? '50%' : photoStyle === 'rounded' ? '12px' : '0';

  // Access content from profile section
  const content = profile.content || {};

  const contactItems = [
    content.email && { icon: <Mail className="w-3.5 h-3.5" />, text: content.email },
    content.phone && { icon: <Phone className="w-3.5 h-3.5" />, text: content.phone },
    content.location && { icon: <MapPin className="w-3.5 h-3.5" />, text: content.location },
    content.website && { icon: <Globe className="w-3.5 h-3.5" />, text: content.website, link: content.website },
    content.linkedin && { icon: <Linkedin className="w-3.5 h-3.5" />, text: 'LinkedIn', link: content.linkedin },
    content.github && { icon: <Github className="w-3.5 h-3.5" />, text: 'GitHub', link: content.github },
  ].filter(Boolean);

  const headerClasses = {
    classic: 'text-center',
    modern: 'text-left',
    minimal: 'text-left',
    banner: 'text-center py-8',
  };

  const headerBg = headerStyle === 'banner' ? { backgroundColor: styles.sectionBg } : {};

  return (
    <div 
      className={`mb-6 ${headerClasses[headerStyle]}`}
      style={{ ...headerBg, borderRadius: styles.borderRadius }}
    >
      <div className={`flex items-center gap-6 ${headerStyle === 'classic' ? 'flex-col' : 'flex-row'}`}>
        {/* Photo */}
        {showPhoto && content.profileImage && (
          <div 
            className="flex-shrink-0 overflow-hidden bg-gray-200"
            style={{ 
              width: photoSize, 
              height: photoSize, 
              borderRadius: photoRadius,
              border: `2px solid ${styles.primary}`
            }}
          >
            <Image 
              src={content.profileImage} 
              alt={content.fullName}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Name and Title */}
        <div className={headerStyle === 'classic' ? '' : 'flex-1'}>
          <h1 
            className="text-2xl font-bold mb-1"
            style={{ ...styles.heading, fontSize: `${(customization.typography?.baseFontSize || 14) * 2}px` }}
          >
            {content.fullName || 'Your Name'}
          </h1>
          {content.jobTitle && (
            <p 
              className="text-lg font-medium mb-3"
              style={{ color: styles.primary }}
            >
              {content.jobTitle}
            </p>
          )}

          {/* Contact Info */}
          <ContactInfo 
            items={contactItems} 
            style={contactStyle} 
            showIcons={options.showIcons ?? true}
            accentColor={styles.primary}
          />
        </div>
      </div>
    </div>
  );
}

// Contact Info Component
function ContactInfo({ items, style, showIcons, accentColor }) {
  if (items.length === 0) return null;

  const renderItem = (item, index) => (
    <span key={index} className="flex items-center gap-1.5 text-sm">
      {showIcons && <span style={{ color: accentColor }}>{item.icon}</span>}
      {item.link ? (
        <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:underline">
          {item.text}
        </a>
      ) : (
        <span>{item.text}</span>
      )}
    </span>
  );

  switch (style) {
    case 'stacked':
      return (
        <div className="flex flex-col gap-1.5">
          {items.map(renderItem)}
        </div>
      );
    case 'grid':
      return (
        <div className="grid grid-cols-2 gap-2">
          {items.map(renderItem)}
        </div>
      );
    case 'icons':
      return (
        <div className="flex gap-3">
          {items.map((item, index) => (
            <a 
              key={index}
              href={item.link || '#'} 
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              style={{ color: accentColor }}
              title={item.text}
            >
              {item.icon}
            </a>
          ))}
        </div>
      );
    default: // inline
      return (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {items.map((item, index) => (
            <span key={index}>
              {renderItem(item, index)}
              {index < items.length - 1 && style === 'inline' && (
                <span className="ml-4 text-gray-300">|</span>
              )}
            </span>
          ))}
        </div>
      );
  }
}

// Section Wrapper Component
function Section({ title, children, styles, icon }) {
  const options = styles.options || {};

  return (
    <div style={{ marginBottom: styles.sectionGap }}>
      {title && (
        <div className="flex items-center gap-2" style={styles.sectionHeading}>
          {icon && <span style={{ color: styles.primary }}>{icon}</span>}
          <h2 style={styles.heading}>{title}</h2>
        </div>
      )}
      <div style={{ paddingLeft: styles.contentPadding }}>{children}</div>
      
      {styles.showDividers && (
        <hr 
          className="mt-4" 
          style={{ 
            borderStyle: styles.dividerStyle,
            borderColor: styles.border,
            borderWidth: '1px 0 0 0'
          }} 
        />
      )}
    </div>
  );
}

// Single Column Layout
function SingleColumnLayout({ sections, styles, customization }) {
  return (
    <div>
      {sections.map((section) => (
        <SectionRenderer 
          key={section.type} 
          section={section} 
          styles={styles}
          customization={customization}
        />
      ))}
    </div>
  );
}

// Multi Column Layout
function MultiColumnLayout({ sections, customization, styles }) {
  const layout = customization.layout || {};
  const layoutType = layout.columns || 'two-column';
  const sidebarWidth = layout.sidebarWidth || 35;

  // Determine which sections go in sidebar vs main
  const sidebarSections = ['skills', 'languages', 'certifications', 'hobbies'];
  
  const sidebar = sections.filter(s => sidebarSections.includes(s.type) && s.type !== 'profile' && s.type !== 'summary');
  const main = sections.filter(s => !sidebarSections.includes(s.type) && s.type !== 'profile' && s.type !== 'summary');

  const isLeftSidebar = layoutType === 'sidebar-left';

  if (layoutType === 'two-column') {
    const half = Math.ceil(sections.filter(s => s.type !== 'profile' && s.type !== 'summary').length / 2);
    const filteredSections = sections.filter(s => s.type !== 'profile' && s.type !== 'summary');
    const leftSections = filteredSections.slice(0, half);
    const rightSections = filteredSections.slice(half);

    return (
      <div className="grid grid-cols-2 gap-6">
        <div>
          {leftSections.map((section) => (
            <SectionRenderer key={section.type} section={section} styles={styles} customization={customization} />
          ))}
        </div>
        <div>
          {rightSections.map((section) => (
            <SectionRenderer key={section.type} section={section} styles={styles} customization={customization} />
          ))}
        </div>
      </div>
    );
  }

  // Sidebar layouts
  const sidebarStyle = {
    width: `${sidebarWidth}%`,
    backgroundColor: styles.sectionBg,
    padding: styles.contentPadding,
    borderRadius: styles.borderRadius,
  };

  return (
    <div className={`flex gap-6 ${isLeftSidebar ? 'flex-row' : 'flex-row-reverse'}`}>
      <div style={sidebarStyle}>
        {sidebar.map((section) => (
          <SectionRenderer key={section.type} section={section} styles={styles} customization={customization} compact />
        ))}
      </div>
      <div className="flex-1">
        {main.map((section) => (
          <SectionRenderer key={section.type} section={section} styles={styles} customization={customization} />
        ))}
      </div>
    </div>
  );
}

// Section Renderer
function SectionRenderer({ section, styles, customization, compact = false }) {
  const options = customization?.options || {};

  if (section.type === 'profile' || section.type === 'summary') return null;

  const sectionConfig = {
    experience: { title: 'Experience', icon: <Briefcase className="w-4 h-4" /> },
    education: { title: 'Education', icon: <GraduationCap className="w-4 h-4" /> },
    skills: { title: 'Skills', icon: <Code className="w-4 h-4" /> },
    projects: { title: 'Projects', icon: <Code className="w-4 h-4" /> },
    certifications: { title: 'Certifications', icon: <Award className="w-4 h-4" /> },
    languages: { title: 'Languages', icon: <LanguagesIcon className="w-4 h-4" /> },
    achievements: { title: 'Achievements', icon: <Star className="w-4 h-4" /> },
    hobbies: { title: 'Hobbies & Interests', icon: <Heart className="w-4 h-4" /> },
  };

  const config = sectionConfig[section.type] || { title: section.title, icon: null };

  return (
    <Section title={config.title} styles={styles} icon={options.showIcons ? config.icon : null}>
      {section.type === 'experience' && <ExperienceContent items={section.items} styles={styles} options={options} />}
      {section.type === 'education' && <EducationContent items={section.items} styles={styles} options={options} />}
      {section.type === 'skills' && <SkillsContent items={section.items} styles={styles} options={options} compact={compact} />}
      {section.type === 'projects' && <ProjectsContent items={section.items} styles={styles} options={options} />}
      {section.type === 'certifications' && <CertificationsContent items={section.items} styles={styles} options={options} />}
      {section.type === 'languages' && <LanguagesContent items={section.items} styles={styles} options={options} compact={compact} />}
      {section.type === 'achievements' && <AchievementsContent items={section.items} styles={styles} options={options} />}
      {section.type === 'hobbies' && <HobbiesContent items={section.items} styles={styles} />}
    </Section>
  );
}

// Experience Content
function ExperienceContent({ items = [], styles, options }) {
  if (!items?.length) return <p className="text-gray-400 italic">No experience added</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.itemGap }}>
      {items.map((item, index) => {
        const exp = item.values || item;
        return (
          <div key={index}>
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-semibold" style={{ color: styles.heading?.color }}>{exp.role || exp.title}</h3>
                <p style={{ color: styles.primary }}>{exp.company}{exp.location && ` • ${exp.location}`}</p>
              </div>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </span>
            </div>
            {exp.description && (
              <div 
                className="mt-2 text-sm whitespace-pre-wrap"
                style={{ 
                  paddingLeft: options?.accentBullets ? '1rem' : 0,
                  borderLeft: options?.accentBullets ? `2px solid ${styles.accent}` : 'none'
                }}
              >
                {exp.description}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Education Content
function EducationContent({ items = [], styles, options }) {
  if (!items?.length) return <p className="text-gray-400 italic">No education added</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.itemGap }}>
      {items.map((item, index) => {
        const edu = item.values || item;
        const school = edu.institution || edu.school;
        const startDate = edu.startYear || edu.startDate;
        const endDate = edu.endYear || edu.endDate;
        const degreeText = edu.field ? `${edu.degree} in ${edu.field}` : edu.degree;
        
        return (
          <div key={index}>
            <div className="flex justify-between items-start mb-1">
              <div>
                <h3 className="font-semibold" style={{ color: styles.heading?.color }}>{degreeText}</h3>
                <p style={{ color: styles.primary }}>{school}{edu.location && ` • ${edu.location}`}</p>
              </div>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {startDate} - {edu.current ? 'Present' : endDate}
              </span>
            </div>
            {edu.gpa && <p className="text-sm">GPA: {edu.gpa}</p>}
            {edu.description && (
              <p className="mt-1 text-sm whitespace-pre-wrap">{edu.description}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Skills Content
function SkillsContent({ items = [], styles, options, compact }) {
  if (!items?.length) return <p className="text-gray-400 italic">No skills added</p>;

  // Form stores: { category: "Programming", skills: ["JS", "Python"] }
  // Each item has: { order, values: { category, skills: [] } }
  const categories = items.map(item => item.values || item);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 8 : 12 }}>
      {categories.map((cat, catIndex) => {
        const categoryName = cat.category || 'General';
        const skillsList = cat.skills || [];
        
        if (!skillsList.length) return null;
        
        return (
          <div key={catIndex}>
            {categories.length > 1 && categoryName && (
              <h4 className="text-sm font-medium mb-2" style={{ color: styles.primary }}>{categoryName}</h4>
            )}
            <div className="flex flex-wrap gap-2">
              {skillsList.map((skillName, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 text-sm rounded"
                  style={{ 
                    backgroundColor: `${styles.primary}15`,
                    color: styles.primary,
                    border: `1px solid ${styles.primary}30`
                  }}
                >
                  {typeof skillName === 'string' ? skillName : skillName.name || skillName}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Projects Content
function ProjectsContent({ items = [], styles, options }) {
  if (!items?.length) return <p className="text-gray-400 italic">No projects added</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.itemGap }}>
      {items.map((item, index) => {
        const project = item.values || item;
        return (
          <div key={index}>
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold" style={{ color: styles.heading?.color }}>{project.name || project.title}</h3>
              <div className="flex gap-2">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-1" style={{ color: styles.primary }}>
                    <ExternalLink className="w-3 h-3" /> Live
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm flex items-center gap-1" style={{ color: styles.primary }}>
                    <Github className="w-3 h-3" /> Code
                  </a>
                )}
              </div>
            </div>
            {project.description && <p className="text-sm mb-2">{project.description}</p>}
            {project.technologies?.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {project.technologies.map((tech, i) => (
                  <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 rounded">{tech}</span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Certifications Content
function CertificationsContent({ items = [], styles, options }) {
  if (!items?.length) return <p className="text-gray-400 italic">No certifications added</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.itemGap }}>
      {items.map((item, index) => {
        const cert = item.values || item;
        const certDate = cert.date || cert.issueDate;
        const certUrl = cert.url || cert.credentialUrl;
        
        return (
          <div key={index} className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold" style={{ color: styles.heading?.color }}>{cert.name}</h3>
              <p className="text-sm" style={{ color: styles.primary }}>{cert.issuer}</p>
              {certUrl && (
                <a href={certUrl} target="_blank" rel="noopener noreferrer" className="text-xs flex items-center gap-1 mt-1" style={{ color: styles.accent }}>
                  <ExternalLink className="w-3 h-3" /> View Credential
                </a>
              )}
            </div>
            <span className="text-sm text-gray-500">{certDate}</span>
          </div>
        );
      })}
    </div>
  );
}

// Languages Content
function LanguagesContent({ items = [], styles, options, compact }) {
  if (!items?.length) return <p className="text-gray-400 italic">No languages added</p>;

  const proficiencyLevels = {
    'Native': 100,
    'Fluent': 90,
    'Advanced': 75,
    'Intermediate': 50,
    'Basic': 25,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: compact ? 6 : 10 }}>
      {items.map((item, index) => {
        const lang = item.values || item;
        const languageName = lang.language || lang.name;
        const proficiency = lang.proficiency || lang.level;
        
        return (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{languageName}</span>
              <span className="text-gray-500">{proficiency}</span>
            </div>
            {options?.showLanguageBars && (
              <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full rounded-full"
                  style={{ 
                    width: `${proficiencyLevels[proficiency] || 50}%`,
                    backgroundColor: styles.primary
                  }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Achievements Content
function AchievementsContent({ items = [], styles, options }) {
  if (!items?.length) return <p className="text-gray-400 italic">No achievements added</p>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: styles.itemGap }}>
      {items.map((item, index) => {
        const achievement = item.values || item;
        return (
          <div key={index}>
            <div className="flex justify-between items-start">
              <h3 className="font-semibold" style={{ color: styles.heading?.color }}>{achievement.title || achievement.name}</h3>
              {achievement.date && <span className="text-sm text-gray-500">{achievement.date}</span>}
            </div>
            {achievement.description && (
              <p className="text-sm mt-1">{achievement.description}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

// Hobbies Content
function HobbiesContent({ items = [], styles }) {
  if (!items?.length) return <p className="text-gray-400 italic">No hobbies added</p>;

  return (
    <div className="flex flex-wrap gap-2">
      {items.map((item, index) => {
        const hobby = item.values || item;
        return (
          <span 
            key={index}
            className="px-3 py-1.5 text-sm rounded-full"
            style={{ 
              backgroundColor: `${styles.primary}10`,
              color: styles.primary,
              border: `1px solid ${styles.primary}25`
            }}
          >
            {hobby.title || hobby.name}
          </span>
        );
      })}
    </div>
  );
}
