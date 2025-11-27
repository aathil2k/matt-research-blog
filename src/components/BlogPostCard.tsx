// src/components/BlogPostCard.tsx
// import { urlFor } from '../sanity/client'
// import { BlogPost } from '../types/blog'
// import {
//   Box,
//   Card,
//   CardBody,
//   Image,
//   Stack,
//   Heading,
//   Text,
//   Tag,
//   HStack
// } from '@chakra-ui/react'
// import Link from 'next/link'

// interface BlogPostCardProps {
//   post: BlogPost
// }

// export default function BlogPostCard({ post }: BlogPostCardProps) {
//   // Safe image URL handling
//   const imageUrl = post.mainImage 
//     ? urlFor(post.mainImage).width(400).height(250).url()
//     : null

//   return (
//     <Card 
//       as={Link} 
//       href={`/blog/${post.slug.current}`}
//       _hover={{ 
//         transform: 'translateY(-4px)',
//         shadow: 'lg',
//         textDecoration: 'none'
//       }}
//       transition="all 0.2s"
//       cursor="pointer"
//       height="100%"
//     >
//       <CardBody p={0}>
//         {/* Image */}
//         {imageUrl ? (
//           <Image
//             src={imageUrl}
//             alt={post.title}
//             width="100%"
//             height="200px"
//             objectFit="cover"
//             borderTopRadius="md"
//           />
//         ) : (
//           <Box
//             width="100%"
//             height="200px"
//             bg="gray.100"
//             display="flex"
//             alignItems="center"
//             justifyContent="center"
//             borderTopRadius="md"
//           >
//             <Text color="gray.500">No image</Text>
//           </Box>
//         )}

//         {/* Content */}
//         <Stack spacing={3} p={4}>
//           {/* Categories */}
//           {post.categories && post.categories.length > 0 && (
//             <HStack spacing={2}>
//               {post.categories.map((category, index) => (
//                 <Tag key={index} size="sm" colorScheme="blue" variant="subtle">
//                   {category.title}
//                 </Tag>
//               ))}
//             </HStack>
//           )}

//           {/* Title */}
//           <Heading size="md" noOfLines={2}>
//             {post.title}
//           </Heading>

//           {/* Excerpt - if available */}
//           {post.excerpt && (
//             <Text color="gray.600" noOfLines={3} fontSize="sm">
//               {post.excerpt}
//             </Text>
//           )}

//           {/* Author and Date */}
//           <Stack spacing={1} pt={2}>
//             <Text fontSize="sm" fontWeight="medium">
//               By {post.author?.name || 'Unknown Author'}
//             </Text>
//             <Text fontSize="xs" color="gray.500">
//               {new Date(post.publishedAt).toLocaleDateString('en-US', {
//                 year: 'numeric',
//                 month: 'long',
//                 day: 'numeric'
//               })}
//             </Text>
//           </Stack>
//         </Stack>
//       </CardBody>
//     </Card>
//   )
// }
// src/components/BlogPostCard.tsx
// src/components/BlogPostCard.tsx
import { BlogPost } from '../types/blog'
import {
  Box,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Tag,
  HStack
} from '@chakra-ui/react'
import Link from 'next/link'

interface BlogPostCardProps {
  post: BlogPost
}

export default function BlogPostCard({ post }: BlogPostCardProps) {
  // Simple function to get image URL without @sanity/image-url
  const getImageUrl = () => {
    if (!post.mainImage?.asset?._ref) return null
    
    try {
      const ref = post.mainImage.asset._ref
      console.log('🖼️ Image ref:', ref) // Debug log
      
      // Extract image ID from the reference
      // Sanity image ref format: image-{id}-{width}x{height}-{format}
      const imageId = ref.replace('image-', '').split('-')[0]
      const dimensions = ref.split('-')[2]
      const format = ref.split('-')[3]
      
      const imageUrl = `https://cdn.sanity.io/images/7cl2mgrx/myblogcontent/${imageId}-${dimensions}.${format}`
      console.log('🖼️ Generated image URL:', imageUrl) // Debug log
      
      return imageUrl
    } catch (error) {
      console.error('❌ Error parsing image URL:', error)
      return null
    }
  }

  const imageUrl = getImageUrl()

  return (
    <Card 
      as={Link} 
      href={`/blog/${post.slug.current}`}
      _hover={{ 
        transform: 'translateY(-4px)',
        shadow: 'lg',
        textDecoration: 'none'
      }}
      transition="all 0.2s"
      cursor="pointer"
      height="100%"
      overflow="hidden"
    >
      <CardBody p={0}>
        {/* Image */}
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={post.title}
            width="100%"
            height="200px"
            objectFit="cover"
            borderTopRadius="md"
            fallback={
              <Box
                width="100%"
                height="200px"
                bg="gray.100"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderTopRadius="md"
              >
                <Text color="gray.500" fontSize="sm">
                  Loading image...
                </Text>
              </Box>
            }
          />
        ) : (
          <Box
            width="100%"
            height="200px"
            bg="gray.100"
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderTopRadius="md"
          >
            <Text color="gray.500" fontSize="sm">
              No image
            </Text>
          </Box>
        )}

        {/* Content */}
        <Stack spacing={3} p={4}>
          {/* Categories */}
          {post.categories && post.categories.length > 0 && (
            <HStack spacing={2} flexWrap="wrap">
              {post.categories.map((category, index) => (
                <Tag key={index} size="sm" colorScheme="blue" variant="subtle">
                  {category.title}
                </Tag>
              ))}
            </HStack>
          )}

          {/* Title */}
          <Heading size="md" noOfLines={2} color="gray.800">
            {post.title}
          </Heading>

          {/* Date */}
          <Text fontSize="sm" color="gray.500">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>

          {/* Body excerpt (if available) */}
          {post.body && (
            <Text fontSize="sm" color="gray.600" noOfLines={3}>
              {extractTextFromBody(post.body)}
            </Text>
          )}
        </Stack>
      </CardBody>
    </Card>
  )
}

// Helper function to extract text from Sanity block content
function extractTextFromBody(body: any[]): string {
  if (!body || !Array.isArray(body)) return ''
  
  return body
    .map(block => {
      if (block._type === 'block' && block.children) {
        return block.children
          .map(child => child.text || '')
          .join(' ')
      }
      return ''
    })
    .join(' ')
    .substring(0, 120) + '...'
}