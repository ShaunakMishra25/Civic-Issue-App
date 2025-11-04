import type { Issue, Comment } from "./issues";

export interface User {
  username: string;
  email: string;
  joinDate: string;
  totalIssues: number;
  totalVotes: number;
  bio: string;
}

export const mockUsers: Record<string, User> = {
  "John Doe": {
    username: "John Doe",
    email: "john.doe@email.com",
    joinDate: "2021-01-15",
    totalIssues: 12,
    totalVotes: 150,
    bio: "Passionate about improving our community infrastructure. I've been reporting civic issues for over 3 years and believe in making our neighborhoods safer and more livable for everyone.",
  },
  "Jane Doe": {
    username: "Jane Doe",
    email: "jane.doe@email.com",
    joinDate: "2021-03-20",
    totalIssues: 8,
    totalVotes: 89,
    bio: "Community advocate and civic engagement enthusiast. Working to ensure our city council hears the voices of residents on important local matters.",
  },
  "Bob Smith": {
    username: "Bob Smith",
    email: "bob.smith@email.com",
    joinDate: "2021-05-10",
    totalIssues: 15,
    totalVotes: 234,
    bio: "Working together to make our city better. I focus on transportation, safety, and environmental issues that affect our daily lives.",
  },
  "Sarah Johnson": {
    username: "Sarah Johnson",
    email: "sarah.j@email.com",
    joinDate: "2022-02-14",
    totalIssues: 6,
    totalVotes: 67,
    bio: "Environmental advocate and community organizer. Passionate about green spaces, waste management, and sustainable urban planning.",
  },
  "Michael Chen": {
    username: "Michael Chen",
    email: "michael.chen@email.com",
    joinDate: "2021-11-08",
    totalIssues: 9,
    totalVotes: 112,
    bio: "Tech professional by day, civic watchdog by night. I use technology and data to help improve our city's infrastructure and services.",
  },
  "Current User": {
    username: "Current User",
    email: "user@email.com",
    joinDate: "2023-01-01",
    totalIssues: 3,
    totalVotes: 45,
    bio: "New member of the community. Excited to contribute to making our city a better place for everyone!",
  },
};

export const mockComments: Comment[] = [
  {
    id: "c1",
    author: "Jane Doe",
    text: "I've seen this too! This has been a problem for weeks. The city really needs to address this urgently.",
    createdAt: "2024-01-15",
  },
  {
    id: "c2",
    author: "Bob Smith",
    text: "This needs to be fixed ASAP. I've reported similar issues in the past. Let me know if you need help escalating this.",
    createdAt: "2024-01-16",
  },
  {
    id: "c3",
    author: "Sarah Johnson",
    text: "Great catch! I'll share this with the local community group. Together we can get this resolved.",
    createdAt: "2024-01-17",
  },
  {
    id: "c4",
    author: "Michael Chen",
    text: "I've been tracking similar issues in this area. This is part of a larger pattern that needs systematic attention.",
    createdAt: "2024-01-18",
  },
  {
    id: "c5",
    author: "John Doe",
    text: "Good documentation! Clear photos and descriptions help a lot. The city council should prioritize this.",
    createdAt: "2024-01-19",
  },
  {
    id: "c6",
    author: "Jane Doe",
    text: "I passed by this location today and can confirm it's still an issue. Thanks for keeping this visible!",
    createdAt: "2024-01-20",
  },
];

export const mockIssues: Issue[] = [
  {
    id: "1",
    title: "Large Pothole on Main Street Causing Traffic Issues",
    description: "There's a significant pothole on Main Street near the intersection of 5th Avenue. It's been getting larger over the past few weeks and is now causing damage to vehicles. Several drivers have reported flat tires and suspension issues. The pothole is approximately 2 feet wide and 6 inches deep. It's located in the right lane, forcing traffic to merge left, which creates congestion during rush hour.",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
    author: "John Doe",
    votes: 45,
    commentCount: 3,
    createdAt: "2024-01-14",
    tags: ["pothole", "crack", "road-damage", "traffic"],
    comments: [
      mockComments[0],
      mockComments[1],
      mockComments[2],
    ],
  },
  {
    id: "2",
    title: "Garbage Overflowing from Public Bins",
    description: "Multiple public garbage bins in the downtown park area are overflowing with trash. The bins haven't been emptied in over a week, and now garbage is spilling onto the sidewalk and grass. This is creating an unsightly and unhygienic situation, especially with the warm weather. The smell is quite noticeable and attracting pests. We need more frequent collection or additional bins in this high-traffic area.",
    imageUrl: "https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&h=600&fit=crop",
    author: "Jane Doe",
    votes: 32,
    commentCount: 2,
    createdAt: "2024-01-13",
    tags: ["waste", "trash", "sanitation", "public-health"],
    comments: [
      mockComments[3],
      mockComments[4],
    ],
  },
  {
    id: "3",
    title: "Broken Streetlight on Residential Road",
    description: "The streetlight at the corner of Elm Street and Oak Avenue has been completely out for the past month. This creates a significant safety concern, especially during winter months when it gets dark early. The area is poorly lit at night, making it unsafe for pedestrians and creating a security risk for nearby homes. I've reported this multiple times but haven't seen any action taken.",
    imageUrl: "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=800&h=600&fit=crop",
    author: "Bob Smith",
    votes: 67,
    commentCount: 4,
    createdAt: "2024-01-12",
    tags: ["streetlight", "electrical", "safety", "dark"],
    comments: [
      mockComments[0],
      mockComments[1],
      mockComments[5],
      mockComments[3],
    ],
  },
  {
    id: "4",
    title: "Water Leakage from Broken Fire Hydrant",
    description: "There's a constant water leak from a fire hydrant on Maple Drive. The water has been flowing for several days, creating a large puddle that extends into the street. This is not only wasteful but also poses a safety hazard as it could freeze during cold weather. The water pressure seems to be reduced in the surrounding area. This needs immediate attention from the water department.",
    imageUrl: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=600&fit=crop",
    author: "Sarah Johnson",
    votes: 89,
    commentCount: 5,
    createdAt: "2024-01-11",
    tags: ["leakage", "pipe", "water", "waste", "safety"],
    comments: [
      mockComments[0],
      mockComments[1],
      mockComments[2],
      mockComments[3],
      mockComments[4],
    ],
  },
  {
    id: "5",
    title: "Dangerous Sidewalk Crack Risking Pedestrian Safety",
    description: "A large crack has developed in the sidewalk on Park Avenue, creating a tripping hazard. The crack is approximately 4 inches wide and has created a significant height difference between the two sections of concrete. This is particularly dangerous for elderly residents and those with mobility issues. I've seen several near-misses where people have almost tripped. The sidewalk needs to be repaired or replaced before someone gets seriously injured.",
    imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    author: "Michael Chen",
    votes: 23,
    commentCount: 2,
    createdAt: "2024-01-10",
    tags: ["crack", "sidewalk", "safety", "pedestrian"],
    comments: [
      mockComments[1],
      mockComments[5],
    ],
  },
  {
    id: "6",
    title: "Abandoned Vehicle Blocking Parking Space",
    description: "An abandoned vehicle has been parked in the same spot for over three weeks. The car appears to be non-functional (flat tires, broken windows) and is taking up valuable parking space in a busy commercial area. The vehicle registration has expired, and it's clearly been abandoned. This violates local parking regulations and is preventing other residents and customers from using the space.",
    imageUrl: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=800&h=600&fit=crop",
    author: "John Doe",
    votes: 18,
    commentCount: 1,
    createdAt: "2024-01-09",
    tags: ["parking", "abandoned", "vehicle", "violation"],
    comments: [
      mockComments[2],
    ],
  },
  {
    id: "7",
    title: "Broken Bench in City Park",
    description: "One of the benches in Riverside Park has been broken for months. The backrest is completely detached, and one of the armrests is missing. This bench was a popular spot for families and elderly visitors. The park maintenance team hasn't addressed this issue despite multiple reports. We need this bench repaired or replaced to restore the park's functionality and appeal.",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    author: "Jane Doe",
    votes: 29,
    commentCount: 2,
    createdAt: "2024-01-08",
    tags: ["park", "bench", "maintenance", "public-space"],
    comments: [
      mockComments[0],
      mockComments[4],
    ],
  },
  {
    id: "8",
    title: "Graffiti Vandalism on Public Building",
    description: "Extensive graffiti has been painted on the side of the community center. While some street art can be beautiful, this appears to be vandalism with inappropriate content. The graffiti covers a large portion of the building's exterior wall and is visible from the main street. This needs to be cleaned or painted over to maintain the community center's professional appearance and prevent further vandalism.",
    imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
    author: "Bob Smith",
    votes: 14,
    commentCount: 1,
    createdAt: "2024-01-07",
    tags: ["vandalism", "graffiti", "public-building", "maintenance"],
    comments: [
      mockComments[3],
    ],
  },
  {
    id: "9",
    title: "Malfunctioning Traffic Signal",
    description: "The traffic signal at the intersection of Main Street and 3rd Avenue has been flashing yellow in all directions for the past week. This creates confusion and potential safety hazards for drivers and pedestrians. The intersection is busy during peak hours, and the lack of proper traffic control could lead to accidents. This requires immediate attention from the traffic department.",
    imageUrl: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop",
    author: "Sarah Johnson",
    votes: 56,
    commentCount: 3,
    createdAt: "2024-01-06",
    tags: ["traffic", "safety", "electrical", "signal"],
    comments: [
      mockComments[1],
      mockComments[2],
      mockComments[4],
    ],
  },
  {
    id: "10",
    title: "Overgrown Vegetation Blocking Sidewalk",
    description: "Tree branches and bushes from private properties along Garden Street have grown so much that they're now blocking the public sidewalk. Pedestrians are forced to walk in the street to avoid the overgrown vegetation, which is dangerous, especially at night. Some branches are low enough to hit people in the face. The property owners need to trim their vegetation, or the city should enforce local ordinances.",
    imageUrl: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&h=600&fit=crop",
    author: "Michael Chen",
    votes: 27,
    commentCount: 2,
    createdAt: "2024-01-05",
    tags: ["vegetation", "sidewalk", "safety", "maintenance"],
    comments: [
      mockComments[0],
      mockComments[5],
    ],
  },
];

export const getUserIssues = (username: string): Issue[] => {
  return mockIssues.filter(issue => issue.author === username);
};

