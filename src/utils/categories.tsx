import {
  IconApiApp,
  IconBulb,
  IconChartLine,
  IconCoffee,
  IconDeviceDesktopAnalytics,
  IconDeviceMobile,
  IconFriends,
  IconHeadphones,
  IconHeartHandshake,
  IconPokeball,
  IconRobot,
  IconSpeakerphone,
  IconWorldWww,
} from "@tabler/icons";

export const categories = [
  {
    name: "Website",
    subcategories: [
      {
        name: "News & Announcement",
        icon: <IconSpeakerphone size={18} />,
        description: "Updates and changes to the website",
      },
      {
        name: "Support",
        icon: <IconHeartHandshake size={18} />,
        description: "Questions and issues with the website",
      },
      {
        name: "Suggestions",
        icon: <IconBulb size={18} />,
        description: "Ideas and suggestions for the website",
      },
    ],
  },

  {
    name: "Technical",
    subcategories: [
      {
        name: "Web Development",
        icon: <IconWorldWww size={18} />,
        description: "Discuss about web development topics",
      },
      {
        name: "Mobile Development",
        icon: <IconDeviceMobile size={18} />,
        description: "Discuss about mobile development topics",
      },
      {
        name: "Artificial Intelligence & Machine Learning",
        icon: <IconRobot size={18} />,
        description: "Discuss about artificial intelligence topics",
      },
      {
        name: "Data Science",
        icon: <IconChartLine size={18} />,
        description: "Discuss about data science topics",
      },
      {
        name: "Software Development",
        icon: <IconApiApp size={18} />,
        description: "Discuss about software development in general",
      },
      {
        name: "Computer Science",
        icon: <IconDeviceDesktopAnalytics size={18} />,
        description: "Discuss about computer science topics in general",
      },
    ],
  },
  {
    name: "General",
    subcategories: [
      {
        name: "Introduce Yourself",
        icon: <IconFriends size={18} />,
        description: "Introduce yourself to the community",
      },
      {
        name: "Games",
        icon: <IconPokeball size={18} />,
        description: "Discuss about games or ask for recommendations",
      },
      {
        name: "Music",
        icon: <IconHeadphones size={18} />,
        description: "Discuss about music or ask for recommendations",
      },
      {
        name: "Casual Discussion",
        icon: <IconCoffee size={18} />,
        description: "Discuss any interesting topics",
      },
    ],
  },
];
