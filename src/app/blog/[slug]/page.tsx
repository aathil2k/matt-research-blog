
// "use client";

// import { use, useEffect, useState } from "react";
// import Link from "next/link";
// import { sanityClient, urlFor } from "../../../sanity/client";
// import {
//   Box,
//   VStack,
//   Heading,
//   Text,
//   Flex,
//   Image,
//   Badge,
//   HStack,
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   Avatar,
//   Button,
//   Spinner,
//   useColorModeValue,
//   Container,
// } from "@chakra-ui/react";
// import { ChevronLeftIcon } from "@chakra-ui/icons";

// // ✅ PortableText component
// function PortableText({ content }: { content: any[] }) {
//   if (!content) return null;
//   const textColor = useColorModeValue("gray.700", "gray.200");
//   return (
//     <Box fontSize={{ base: "sm", md: "md" }} lineHeight="1.6">
//       {content.map((block: any, i: number) => (
//         <Text key={i} color={textColor} mb={3}>
//           {block.children?.map((child: any) => child.text).join(" ")}
//         </Text>
//       ))}
//     </Box>
//   );
// }

// // ✅ Author info
// function AuthorInfo({ author }: { author: any }) {
//   const img = author?.image ? urlFor(author.image).width(40).url() : null;
//   return (
//     <Flex align="center" gap={2}>
//       <Avatar size="sm" src={img || undefined} name={author?.name || "Unknown"} />
//       <Text fontSize="sm" color="gray.600">
//         {author?.name || "Unknown Author"}
//       </Text>
//     </Flex>
//   );
// }

// // ✅ BlogPostPage Component
// export default function BlogPostPage({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) {
//   const { slug } = use(params);
//   const [post, setPost] = useState<any>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!slug) return;

//     const fetchPost = async () => {
//       try {
//         const normalizedSlug = decodeURIComponent(slug);
//         console.log("Fetching post with slug:", normalizedSlug);

//         const query = `
//           *[_type == "post" && slug.current == $slug][0]{
//             title,
//             mainImage,
//             body,
//             _createdAt,
//             author->{name, image},
//             categories[]->{title}
//           }
//         `;

//         const data = await sanityClient.fetch(query, { slug: normalizedSlug });
//         console.log("Fetched post data:", data);
//         setPost(data);
//       } catch (error) {
//         console.error("Error fetching post:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [slug]);

//   // ✅ Loading state
//   if (loading)
//     return (
//       <Flex minH="100vh" align="center" justify="center">
//         <Spinner size="xl" color="blue.500" />
//       </Flex>
//     );

//   // ✅ Not found state
//   if (!post)
//     return (
//       <Flex minH="100vh" direction="column" align="center" justify="center">
//         <Text fontWeight="bold">Blog post not found</Text>
//         <Link href="/blog">
//           <Button mt={2} colorScheme="blue" leftIcon={<ChevronLeftIcon />}>
//             Back to Blog
//           </Button>
//         </Link>
//       </Flex>
//     );

//   const imageUrl = post.mainImage ? urlFor(post.mainImage).width(800).url() : null;
//   const categories = post.categories || [];

//   return (
//     <Container maxW="container.xl" minH="100vh" py={{ base: 4, md:1 }}>
//         <Flex
//           justify="space-between"
//           align="center"
//           pt={4}
//            borderTop="1px solid"
//           borderColor="gray.200"
//         >
//           <AuthorInfo author={post.author} />
//           <Link href="/blog">
//             <Button
//               size={{ base: "sm", md: "md" }}
//               leftIcon={<ChevronLeftIcon />}
//               colorScheme="blue"
//               variant="ghost"
//             >
//               Back to Blog
//             </Button>
//           </Link>
//         </Flex>
//       <Box
//         bg="white"
//         borderRadius="lg"
//         boxShadow="sm"
//         p={{ base: 4, md: 6, lg: 8 }}
//       >
//         {/* Breadcrumb */}
//         <Breadcrumb fontSize="sm" mb={4}>
//           <BreadcrumbItem>
//             <BreadcrumbLink as={Link} href="/blog" color="blue.600">
//               Blog
//             </BreadcrumbLink>
//           </BreadcrumbItem>
//           <BreadcrumbItem isCurrentPage>
//             <BreadcrumbLink color="gray.600">
//               {post.title}
//             </BreadcrumbLink>
//           </BreadcrumbItem>
//         </Breadcrumb>

//         {/* Categories */}
//         <HStack spacing={2} mb={4} flexWrap="wrap">
//           {categories.map((cat: any, i: number) => (
//             <Badge
//               key={i}
//               colorScheme="blue"
//               borderRadius="full"
//               px={3}
//               py={1}
//               fontSize="xs"
//             >
//               {cat.title}
//             </Badge>
//           ))}
//         </HStack>

//         {/* Title */}
//         <Heading
//           size={{ base: "lg", md: "xl" }}
//           color="gray.800"
//           lineHeight="1.3"
//           mb={6}
//         >
//           {post.title}
//         </Heading>

//         {/* Content Area with Floating Image */}
//         <Box position="relative">
//           {/* Floating Image on Right */}
//           <Box
//             float={{ base: "none", md: "right" }}
//             ml={{ base: 0, md: 6 }}
//             mb={{ base: 4, md: 4 }}
//             width={{ base: "100%", md: "45%", lg: "40%" }}
//             borderRadius="lg"
//             overflow="hidden"
//             boxShadow="lg"
//           >
//             {imageUrl ? (
//               <Image
//                 src={imageUrl}
//                 alt={post.title}
//                 objectFit="cover"
//                 width="100%"
//                 height="auto"
//                 display="block"
//                 transition="transform 0.3s ease"
//                 _hover={{ transform: "scale(1.02)" }}
//               />
//             ) : (
//               <Flex
//                 height="300px"
//                 align="center"
//                 justify="center"
//                 bg="gray.100"
//                 borderRadius="lg"
//               >
//                 <Text fontSize="lg" color="gray.500">
//                   No Image
//                 </Text>
//               </Flex>
//             )}
//           </Box>

//           {/* Text Content that Wraps Around Image */}
//           <Box>
//             <PortableText content={post.body} />
//           </Box>

//           {/* Clear Float */}
//           {/* <Box clear="both" /> */}
//         </Box>

//         {/* Footer */}
      
//       </Box>
//     </Container>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { sanityClient, urlFor } from "../../../sanity/client";
import {
  Box,
  VStack,
  Heading,
  Text,
  Flex,
  Image,
  Badge,
  HStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Avatar,
  Button,
  Spinner,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { ChevronLeftIcon } from "@chakra-ui/icons";
import { px } from "framer-motion";

// ✅ PortableText component (renders both string and block array)
function PortableText({ content }: { content: any }) {
  const textColor = useColorModeValue("gray.700", "gray.200");

  if (!content) return null;

  // If AI-generated post is plain text
  if (typeof content === "string") {
    return (
      <Text whiteSpace="pre-line" color={textColor} fontSize={{ base: "sm", md: "md" }}>
        {content}
      </Text>
    );
  }

  // If it's a Sanity block array
  return (
    <Box fontSize={{ base: "sm", md: "md" }} lineHeight="1.6">
      {content.map((block: any, i: number) => (
        <Text key={i} color={textColor} mb={3}>
          {block.children?.map((child: any) => child.text).join(" ")}
        </Text>
      ))}
    </Box>
  );
}

// ✅ Author info
function AuthorInfo({ author }: { author: any }) {
  const img = author?.image ? urlFor(author.image).width(40).url() : null;
  return (
    <Flex align="center" gap={2} >
      <Avatar size="sm" src={img || undefined} name={author?.name || "Admin"} />
      <Text fontSize="sm" color="gray.600">
        {author?.name || "Admin"}
      </Text>
    </Flex>
  );
}

// ✅ Main Blog Post Page
export default function BlogPostPage() {
  const params = useParams();
  const slug = (params?.slug as string) || "";
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      try {
        const normalizedSlug = decodeURIComponent(slug as string);
        console.log("Fetching post:", normalizedSlug);

        const query = `
          *[_type == "post" && slug.current == $slug][0]{
            title,
            mainImage,
            body,
            _createdAt,
            author->{name, image},
            categories[]->{title}
          }
        `;

        const data = await sanityClient.fetch(query, { slug: normalizedSlug });
        setPost(data);
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  // ✅ Loading
  if (loading)
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" color="blue.500" />
      </Flex>
    );

  // ✅ Not Found
  if (!post)
    return (
      <Flex minH="100vh" direction="column" align="center" justify="center">
        <Text fontWeight="bold">Blog post not found</Text>
        <Link href="/blog">
          <Button mt={2} colorScheme="blue" leftIcon={<ChevronLeftIcon />}>
            Back to Blog
          </Button>
        </Link>
      </Flex>
    );

  const imageUrl = post.mainImage ? urlFor(post.mainImage).width(800).url() : null;
  const categories = post.categories || [];

  return (
    <Container maxW="container.xl" minH="100vh" py={{ base: 4, md: 8 }}>
      {/* Header */}
      <Flex justify="space-between" align="center" pt={4}  borderColor="gray.200">
        <AuthorInfo author={post.author} />
        <Link href="/blog">
          <Button
            size={{ base: "sm", md: "md" }}
            leftIcon={<ChevronLeftIcon />}
            colorScheme="blue"
            variant="ghost"
          >
            Back to Blog
          </Button>
        </Link>
      </Flex>

      {/* Post Container */}
      <Box bg="white" borderRadius="lg" boxShadow="sm" p={{ base: 4, md: 6, lg: 8 }} mt={4}>
        {/* Breadcrumb */}
        <Breadcrumb fontSize="sm" mb={4}>
          <BreadcrumbItem>
            <BreadcrumbLink as={Link} href="/blog" color="blue.600">
              Blog
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink color="gray.600">{post.title}</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        {/* Categories */}
        <HStack spacing={2} mb={4} flexWrap="wrap">
          {categories.map((cat: any, i: number) => (
            <Badge key={i} colorScheme="blue" borderRadius="full" px={3} py={1} fontSize="xs">
              {cat.title}
            </Badge>
          ))}
        </HStack>

        {/* Title */}
        <Heading size={{ base: "lg", md: "xl" }} color="gray.800" lineHeight="1.3" mb={6}>
          {post.title}
        </Heading>

        {/* Image + Content */}
        <Box position="relative">
          {/* Right Floating Image */}
          <Box
            float={{ base: "none", md: "right" }}
            ml={{ base: 0, md: 6 }}
            mb={{ base: 4, md: 4 }}
            width={{ base: "100%", md: "45%", lg: "40%" }}
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
          >
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={post.title}
                objectFit="cover"
                width="100%"
                height="auto"
                transition="transform 0.3s ease"
                _hover={{ transform: "scale(1.02)" }}
              />
            ) : (
              <Flex height="300px" align="center" justify="center" bg="gray.100" borderRadius="lg">
                <Text fontSize="lg" color="gray.500">
                  No Image
                </Text>
              </Flex>
            )}
          </Box>

          {/* Blog Text */}
          <Box>
            <PortableText content={post.body} />
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
