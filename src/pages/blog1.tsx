// // src/app/blog1/page.tsx
// import BlogPage from '../app/blog/page'

// export default function Blog1Page() {
//   return <BlogPage />
// }
// import React from 'react'
// import Navbar from '../components/Navbar'
// import Testimonials from '../components/Testimonials'
// import Footereds from '../components/Servicefooter'
// import BlogPage from '../app/blog/page'
// import { ChakraProvider } from '@chakra-ui/react'

// const blog = () => {
//   return (
//       <ChakraProvider>
//     <div>
   
     
//     <BlogPage />
//       <Testimonials />
//       <Footereds />
      
//     </div>
//     </ChakraProvider>
//   )
// }

// export default blog
// import React from 'react'
// import Navbar from '../components/Navbar'
// import Testimonials from '../components/Testimonials'
// import Footereds from '../components/Servicefooter'
// import BlogPage from '../app/blog/page'

// const Blog = () => {
//   return (
//     <>
     
//       <BlogPage />
//       <Testimonials />
//       <Footereds />
//     </>
//   )
// }

// export default Blog
import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "../components/Navbar";        // adjust import paths
import BlogPage from "../app/blog/page";
import Footer from "../components/Servicefooter";
export default function Blog() {
  return (
    <ChakraProvider>
      <Navbar />
      <BlogPage />
      <Footer/>
    </ChakraProvider>
  );
}