


// import {
//     Box,
//     Flex,
//     Text,
//     IconButton,
//     Stack,
//     Collapse,
//     Link,
//     Popover,
//     PopoverTrigger,
//     PopoverContent,
//     useColorModeValue,
//     useDisclosure,
//     Heading,
//     HStack,
//     Icon,
// } from '@chakra-ui/react';
// import logo from '../assets/Mattlogono2.png';
// import {
//     HamburgerIcon,
//     CloseIcon,
//     ChevronRightIcon,
//     ChevronDownIcon,
// } from '@chakra-ui/icons';
// import Image from 'next/image';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';

// export default function Navbar() {
//     const { isOpen, onToggle } = useDisclosure();
//     const router = useRouter();
//     const { asPath } = router;
//     const NAV_ITEMS = getNavItems(asPath);

//     const [isScrolled, setIsScrolled] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > 50); // Adjust the threshold as needed
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     return (
//         <Box
//             position="sticky"
//             top={0}
//             left={0}
//             right={0}
//             zIndex={10}
//             // boxShadow={isScrolled ? 'lg' : 'none'}
//             bg={isScrolled ? useColorModeValue('white', 'gray.600'):'white'}
//             transition="background-color 0.3s ease"
//         >
//             <Flex
//                 color={useColorModeValue('gray.600', 'white')}
//                 minH={'100px'}
//                 py={{ base: 2 }}
//                 px={{ base: 4 }}
//                 borderBottom={1}
//                 borderStyle={'solid'}
//                 // borderColor={useColorModeValue('gray.200', 'gray.900')}
//                 align={'center'}
//             >
//                 <Flex
//                     flex={{ base: 0, md: 'auto' }}
//                     ml={{ base: -2 }}
//                     display={{ base: 'flex', md: 'none' }}
//                 >
//                     <IconButton
//                         onClick={onToggle}
//                         icon={
//                             isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
//                         }
//                         variant={'ghost'}
//                         aria-label={'Toggle Navigation'}
//                     />
//                 </Flex>
//                 <Flex justify={{ base: 'center', md: 'start' }}>
//                     <HStack>
//                         <Box
//                             width={{
//                                 base: "40px",
//                                 sm: "50px",
//                                 md: "70px",
//                                 lg: "85px",
//                                 xl: "110px",
//                                 "2xl": "95px",
//                             }}
//                             height={{
//                                 base: "40px",
//                                 sm: "50px",
//                                 md: "70px",
//                                 lg: "8 0px",
//                                 xl: "110px",
//                                 "2xl": "95px",
//                             }}
//                             ml={{ base: '1px', md: '18' }}
//                             position="relative"
//                         >
//                             <Image
//                                 src={logo}
//                                 alt="Matt logo"
//                                 unoptimized={true}
//                                 layout="fill"
//                                 objectFit="contain"
//                             />
//                         </Box>
//                         <Link href='/' style={{ textDecoration: 'none' }}>
//                             <Heading
//                                 m={0}
//                                 as='h3'
//                                 fontSize={{
//                                     base: '18px', sm: '25px', md: '20px', lg: '14px', xl: '25px', '2xl': '25px'
//                                 }}
//                             >
//                                 MATT RESEARCH SOLUTIONS
//                             </Heading>
//                         </Link>
//                         <Flex display={{ base: 'none', md: 'flex' }} ml={{ base: 0, sm: 2, md: 4, lg: 10, xl: 20 }}>
//                             <DesktopNav navItems={NAV_ITEMS} />
//                         </Flex>
//                     </HStack>
//                 </Flex>
//             </Flex>

//             <Collapse in={isOpen} animateOpacity>
//                 <MobileNav navItems={NAV_ITEMS} />
//             </Collapse>
//         </Box>
//     );
// }

// const DesktopNav = ({ navItems }) => {
//     const linkColor = useColorModeValue('gray.600', 'gray.200');
//     const linkHoverColor = useColorModeValue('gray.800', 'white');
//     const popoverContentBgColor = useColorModeValue('white', 'gray.800');

//     return (
//         <Stack direction={'row'} spacing={{ base: 0, md: 0, lg: 0,xl:4 }} ml={{ base: '9px', md: '20px', lg: '40px' }}>
//             {navItems.map((navItem) => (
//                 <Box key={navItem.label}>
//                     <Popover trigger={'hover'} placement={'bottom-start'}>
//                         <PopoverTrigger>
//                             <Link
//                                 p={2}
//                                 href={navItem.href ?? '/'}
//                                 fontSize={{
//                                     base: '12px', sm: '14px', md: '13px', lg: '15px', xl: '19px', '2xl': '22px'
//                                 }}
//                                 fontWeight={500}
//                                 m={0}
//                                 color={linkColor}
//                                 _hover={{ textDecoration: 'none', color: linkHoverColor }}
//                             >
//                                 {navItem.label}
//                             </Link>
//                         </PopoverTrigger>

//                         {navItem.children && (
//                             <PopoverContent
//                                 border={0}
//                                 boxShadow={'xl'}
//                                 bg={popoverContentBgColor}
//                                 p={4}
//                                 rounded={'xl'}
//                                 minW={'sm'}
//                             >
//                                 <Stack>
//                                     {navItem.children.map((child) => (
//                                         <DesktopSubNav key={child.label} {...child} />
//                                     ))}
//                                 </Stack>
//                             </PopoverContent>
//                         )}
//                     </Popover>
//                 </Box>
//             ))}
//         </Stack>
//     );
// };

// const DesktopSubNav = ({ label, href }) => (
//     <Link
//         href={href}
//         role={'group'}
//         display={'block'}
//         p={2}
//         rounded={'md'}
//         _hover={{ bg: useColorModeValue('#425d81', 'gray.900') }}
//     >
//         <Stack direction={'row'} align={'center'}>
//             <Box>
//                 <Text
//                     transition={'all .3s ease'}
//                     _groupHover={{ color: 'white' }}
//                     fontWeight={500}
//                 >
//                     {label}
//                 </Text>
//             </Box>
//             <Flex
//                 transition={'all .3s ease'}
//                 transform={'translateX(-10px)'}
//                 opacity={0}
//                 _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
//                 justify={'flex-end'}
//                 align={'center'}
//                 flex={1}
//             >
//                 <Icon color={'white'} w={5} h={5} as={ChevronRightIcon} />
//             </Flex>
//         </Stack>
//     </Link>
// );

// const MobileNav = ({ navItems }) => (
//     <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
//         {navItems.map((navItem) => (
//             <MobileNavItem key={navItem.label} {...navItem} />
//         ))}
//     </Stack>
// );

// const MobileNavItem = ({ label, children, href }) => {
//     const { isOpen, onToggle } = useDisclosure();

//     return (
//         <Stack spacing={4} onClick={children && onToggle}>
//             <Flex
//                 py={2}
//                 as={Link}
//                 href={href ?? '#'}
//                 justify={'space-between'}
//                 align={'center'}
//                 _hover={{ textDecoration: 'none' }}
//             >
//                 <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
//                     {label}
//                 </Text>
//                 {children && (
//                     <Icon
//                         as={ChevronDownIcon}
//                         transition={'all .25s ease-in-out'}
//                         transform={isOpen ? 'rotate(180deg)' : ''}
//                         w={6}
//                         h={6}
//                     />
//                 )}
//             </Flex>

//             <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
//                 <Stack
//                     mt={2}
//                     pl={4}
//                     borderLeft={1}
//                     borderStyle={'solid'}
//                     borderColor={useColorModeValue('gray.200', 'gray.700')}
//                     align={'start'}
//                 >
//                     {children &&
//                         children.map((child) => (
//                             <Link key={child.label} py={2} href={child.href}>
//                                 {child.label}
//                             </Link>
//                         ))}
//                 </Stack>
//             </Collapse>
//         </Stack>
//     );
// };

//  interface NavItem {
//      label: string;
//      children?: Array<NavItem>;
//      href?: string;
//  }

//  const getNavItems = (currentUrl) => {
//      const shouldDisplayResearchArticleWriting = false;
//      const navItems: NavItem[] = [
//          {
//              label: 'Home',
//              href: '/' ,
//          },
//          {
//              label: 'About Us',
//              children: [
//                  { label: 'Who We Are', href: '/whatwedo' },
//                  // { label: 'Our Team', href: '/ourteam' },
//                  { label: 'Our Process', href: '/ourprocesses' },
//                  { label: 'Why Choose Us', href: '/whychooseus' },
//              ],
//          },
//          {
//              label: ' Services',
//              children: [
//                  { label: 'Research Proposal Writings', href: '/ServiceDetail/Research-Proposal-Writing' },
//                  { label: 'Literature Review & Research Design', href: '/ServiceDetail/Literature-Review-Research-Design' },
//                  { label: 'Thesis/Dissertation Writing', href: '/ServiceDetail/Thesis-and-Dissertation-Writing' },
//                  { label: 'Publication & Journal Support', href: '/ServiceDetail/Publication-Journal-Support' },
//                  { label: 'Data Collection & Analysis', href: '/ServiceDetail/Data-Collection-Analysis' },
//                  { label: 'Workshops & Training', href: '/ServiceDetail/Wrokshops-Training' },
//                  { label: 'Grant Writing & Ethical Compliance', href: '/ServiceDetail/Grant-Writing-Ethical-Compliance' },
//                  { label: 'Implementation Support', href: '/ServiceDetail/Project-Development-Implementation' },
                
//              ],
//          },
//          {
//              label: 'Projects',
//              children: [
//                  { label: 'Case Studies', href: '/case-studies' },
//                  // { label: 'Ongoing Projects', href: '/ongoingproject' },
//                  { label: 'Our Gallery', href: '/Our-Stroy' },
//              ],
//          },
//          {
//              label: 'Publications',
//              // children: [
//              //     { label: 'White Papers', href: '/whitepaper' },
//              //     { label: 'Blog', href: '/blog' },
//             //     // { label: 'Published Research', href: '/publishedresearch' },
//              // ],
//          },
//          {
//              label: 'Resources',
//              children: [
//                  // { label: 'PhD Tools & Resources', href: '/phdtoolsandresearch' },
//                  { label: 'Research Guidelines', href: '/research-guidelines' },
//                  // { label: 'Templates & Downloads', href: '/templatedownload' },
//                  { label: 'FAQ', href: '/faq' },
//              ],
//          },
//          {
//              label: 'Contact us',
//              href: '/contactuspage',
//              // children: [
//              //     // { label: 'Get in Touch', href: '/contactuspage/general' },
//             //     // { label: 'Schedule a Consultation', href: '/contactuspage/support' },
//              //     // { label: 'Career Opportunities', href: '/contactuspage/feedback' },
                
//              // ],
//          },
//      ];

//      // Example filtering logic
//      return navItems.filter(item => {
//          if (item.label === 'Research Article Writing' && !shouldDisplayResearchArticleWriting) {
//              return false;
//          }
//          return true;
//      });
// //  };
/////////////////////////////////////////////////////////////
// "use client";
// import {
//     Box,
//     Flex,
//     Text,
//     IconButton,
//     Stack,
//     Collapse,
//     Link,
//     Popover,
//     PopoverTrigger,
//     PopoverContent,
//     useColorModeValue,
//     useDisclosure,
//     Heading,
//     HStack,
//     Icon,
// } from '@chakra-ui/react';
// import logo from '../assets/Mattlogono2.png';
// import {
//     HamburgerIcon,
//     CloseIcon,
//     ChevronRightIcon,
//     ChevronDownIcon,
// } from '@chakra-ui/icons';
// import Image from 'next/image';
// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';

// export default function Navbar() {
//     const { isOpen, onToggle } = useDisclosure();
//     const router = useRouter();
//     const { asPath } = router;
//     const NAV_ITEMS = getNavItems(asPath);

//     const [isScrolled, setIsScrolled] = useState(false);

//     useEffect(() => {
//         const handleScroll = () => {
//             setIsScrolled(window.scrollY > 50);
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     return (
//         <Box
//             position="sticky"
//             top={0}
//             left={0}
//             right={0}
//             zIndex={10}
//             bg={isScrolled ? useColorModeValue('white', 'gray.600'):'white'}
//             transition="background-color 0.3s ease"
//         >
//             <Flex
//                 color={useColorModeValue('gray.600', 'white')}
//                 minH={{ base: '60px', sm: '70px', md: '80px', lg: '90px', xl: '100px' }}
//                 py={{ base: 2 }}
//                 px={{ base: 3, sm: 4, md: 6, lg: 8 }}
//                 borderBottom={1}
//                 borderStyle={'solid'}
//                 align={'center'}
//                 maxW="100vw"
//                 overflow="hidden"
//             >
//                 <Flex
//                     flex={{ base: 0, md: 'auto' }}
//                     ml={{ base: -2 }}
//                     display={{ base: 'flex', md: 'none' }}
//                 >
//                     <IconButton
//                         onClick={onToggle}
//                         icon={
//                             isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
//                         }
//                         variant={'ghost'}
//                         aria-label={'Toggle Navigation'}
//                         size={{ base: 'sm', sm: 'md' }}
//                     />
//                 </Flex>
                
//                 <Flex 
//                     justify={{ base: 'center', md: 'start' }} 
//                     align="center"
//                     flex={1}
//                     overflow="hidden"
//                 >
//                     <HStack 
//                         spacing={{ base: 2, sm: 3, md: 4 }}
//                         align="center"
//                         flex={1}
//                         maxW="100%"
//                     >
//                         <Box
//                             width={{
//                                 base: "35px",
//                                 sm: "45px",
//                                 md: "60px",
//                                 lg: "75px",
//                                 xl: "90px",
//                                 "2xl": "95px",
//                             }}
//                             height={{
//                                 base: "35px",
//                                 sm: "45px",
//                                 md: "60px",
//                                 lg: "75px",
//                                 xl: "90px",
//                                 "2xl": "95px",
//                             }}
//                             ml={{ base: '0', md: '2', lg: '4' }}
//                             position="relative"
//                             flexShrink={0}
//                         >
//                             <Image
//                                 src={logo}
//                                 alt="Matt logo"
//                                 unoptimized={true}
//                                 layout="fill"
//                                 objectFit="contain"
//                             />
//                         </Box>
                        
//                         <Link 
//                             href='/' 
//                             style={{ textDecoration: 'none' }}
//                             flexShrink={1}
//                             minW={0}
//                         >
//                             <Heading
//                                 m={0}
//                                 as='h3'
//                                 fontSize={{
//                                     base: '14px', 
//                                     sm: '16px', 
//                                     md: '18px', 
//                                     lg: '20px', 
//                                     xl: '22px', 
//                                     '2xl': '25px'
//                                 }}
//                                 whiteSpace={{ base: 'nowrap', sm: 'normal' }}
//                                 overflow={{ base: 'hidden', sm: 'visible' }}
//                                 textOverflow={{ base: 'ellipsis', sm: 'clip' }}
//                             >
//                                 MATT RESEARCH SOLUTIONS
//                             </Heading>
//                         </Link>
                        
//                         <Flex 
//                             display={{ base: 'none', lg: 'flex' }} 
//                             ml={{ lg: 4, xl: 6, '2xl': 8 }}
//                             flexShrink={0}
//                         >
//                             <DesktopNav navItems={NAV_ITEMS} />
//                         </Flex>
//                     </HStack>
//                 </Flex>
//             </Flex>

//             <Collapse in={isOpen} animateOpacity>
//                 <MobileNav navItems={NAV_ITEMS} />
//             </Collapse>
//         </Box>
//     );
// }

// const DesktopNav = ({ navItems }) => {
//     const linkColor = useColorModeValue('gray.600', 'gray.200');
//     const linkHoverColor = useColorModeValue('gray.800', 'white');
//     const popoverContentBgColor = useColorModeValue('white', 'gray.800');

//     return (
//         <Stack 
//             direction={'row'} 
//             spacing={{ lg: 2, xl: 3, '2xl': 4 }}
//             wrap="nowrap"
//             overflow="hidden"
//         >
//             {navItems.map((navItem) => (
//                 <Box key={navItem.label} flexShrink={0}>
//                     <Popover trigger={'hover'} placement={'bottom-start'}>
//                         <PopoverTrigger>
//                             <Link
//                                 p={{ lg: 1, xl: 2 }}
//                                 href={navItem.href ?? '/'}
//                                 fontSize={{
//                                     lg: '13px', 
//                                     xl: '20px', 
//                                     '2xl': '18px'
//                                 }}
//                                 fontWeight={500}
//                                 m={0}
//                                 color={linkColor}
//                                 _hover={{ textDecoration: 'none', color: linkHoverColor }}
//                                 whiteSpace="nowrap"
//                                 display="block"
//                             >
//                                 {navItem.label}
//                             </Link>
//                         </PopoverTrigger>

//                         {navItem.children && (
//                             <PopoverContent
//                                 border={0}
//                                 boxShadow={'xl'}
//                                 bg={popoverContentBgColor}
//                                 p={4}
//                                 rounded={'xl'}
//                                 minW={'sm'}
//                                 maxW="300px"
//                                 zIndex={20}
//                             >
//                                 <Stack>
//                                     {navItem.children.map((child) => (
//                                         <DesktopSubNav key={child.label} {...child} />
//                                     ))}
//                                 </Stack>
//                             </PopoverContent>
//                         )}
//                     </Popover>
//                 </Box>
//             ))}
//         </Stack>
//     );
// };

// const DesktopSubNav = ({ label, href }) => (
//     <Link
//         href={href}
//         role={'group'}
//         display={'block'}
//         p={2}
//         rounded={'md'}
//         _hover={{ bg: useColorModeValue('#425d81', 'gray.900') }}
//     >
//         <Stack direction={'row'} align={'center'}>
//             <Box flex={1}>
//                 <Text
//                     transition={'all .3s ease'}
//                     _groupHover={{ color: 'white' }}
//                     fontWeight={500}
//                     fontSize="base"
//                     noOfLines={1}
//                 >
//                     {label}
//                 </Text>
//             </Box>
//             <Flex
//                 transition={'all .3s ease'}
//                 transform={'translateX(-10px)'}
//                 opacity={0}
//                 _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
//                 justify={'flex-end'}
//                 align={'center'}
//                 flexShrink={0}
//             >
//                 <Icon color={'white'} w={4} h={4} as={ChevronRightIcon} />
//             </Flex>
//         </Stack>
//     </Link>
// );

// const MobileNav = ({ navItems }) => (
//     <Stack 
//         bg={useColorModeValue('white', 'gray.800')} 
//         p={{ base: 3, sm: 4 }} 
//         display={{ lg: 'none' }}
//         maxH="70vh"
//         overflowY="auto"
//         spacing={2}
//     >
//         {navItems.map((navItem) => (
//             <MobileNavItem key={navItem.label} {...navItem} />
//         ))}
//     </Stack>
// );

// const MobileNavItem = ({ label, children, href }) => {
//     const { isOpen, onToggle } = useDisclosure();

//     return (
//         <Stack spacing={2} onClick={children && onToggle}>
//             <Flex
//                 py={2}
//                 as={Link}
//                 href={href ?? '#'}
//                 justify={'space-between'}
//                 align={'center'}
//                 _hover={{ textDecoration: 'none' }}
//                 borderRadius="md"
//                 px={2}
//                 _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
//             >
//                 <Text 
//                     fontWeight={600} 
//                     color={useColorModeValue('gray.600', 'gray.200')}
//                     fontSize={{ base: 'md', sm: 'lg' }}
//                 >
//                     {label}
//                 </Text>
//                 {children && (
//                     <Icon
//                         as={ChevronDownIcon}
//                         transition={'all .25s ease-in-out'}
//                         transform={isOpen ? 'rotate(180deg)' : ''}
//                         w={{ base: 5, sm: 6 }}
//                         h={{ base: 5, sm: 6 }}
//                         flexShrink={0}
//                     />
//                 )}
//             </Flex>

//             <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
//                 <Stack
//                     mt={2}
//                     pl={4}
//                     borderLeft={1}
//                     borderStyle={'solid'}
//                     borderColor={useColorModeValue('gray.200', 'gray.700')}
//                     align={'start'}
//                     spacing={1}
//                 >
//                     {children &&
//                         children.map((child) => (
//                             <Link 
//                                 key={child.label} 
//                                 py={2} 
//                                 px={2}
//                                 href={child.href}
//                                 fontSize={{ base: 'sm', sm: 'md' }}
//                                 color={useColorModeValue('gray.500', 'gray.300')}
//                                 _hover={{ 
//                                     color: useColorModeValue('gray.700', 'white'),
//                                     bg: useColorModeValue('gray.50', 'gray.700'),
//                                     textDecoration: 'none'
//                                 }}
//                                 borderRadius="sm"
//                                 display="block"
//                                 width="100%"
//                             >
//                                 {child.label}
//                             </Link>
//                         ))}
//                 </Stack>
//             </Collapse>
//         </Stack>
//     );
// };

// interface NavItem {
//     label: string;
//     children?: Array<NavItem>;
//     href?: string;
// }

// const getNavItems = (currentUrl) => {
//     const shouldDisplayResearchArticleWriting = false;
//     const navItems: NavItem[] = [
//         {
//             label: 'Home',
//             href: '/' ,
//         },
//         {
//             label: 'About Us',
//             children: [
//                 { label: 'Who We Are', href: '/whatwedo' },
//                 { label: 'Our Process', href: '/ourprocesses' },
//                 { label: 'Why Choose Us', href: '/whychooseus' },
//             ],
//         },
//         {
//             label: 'Services',
//             children: [
//                 { label: 'Research Proposal Writings', href: '/ServiceDetail/Research-Proposal-Writing' },
//                 { label: 'Literature Review & Research Design', href: '/ServiceDetail/Literature-Review-Research-Design' },
//                 { label: 'Thesis/Dissertation Writing', href: '/ServiceDetail/Thesis-and-Dissertation-Writing' },
//                 { label: 'Publication & Journal Support', href: '/ServiceDetail/Publication-Journal-Support' },
//                 { label: 'Data Collection & Analysis', href: '/ServiceDetail/Data-Collection-Analysis' },
//                 { label: 'Workshops & Training', href: '/ServiceDetail/Wrokshops-Training' },
//                 { label: 'Grant Writing & Ethical Compliance', href: '/ServiceDetail/Grant-Writing-Ethical-Compliance' },
//                 { label: 'Implementation Support', href: '/ServiceDetail/Project-Development-Implementation' },
//             ],
//         },
//         {
//             label: 'Projects',
//             children: [
//                 { label: 'Case Studies', href: '/case-studies' },
//                 { label: 'Our Gallery', href: '/Our-Stroy' },
//             ],
//         },
//         {
//             label: 'Publications',
//         },
//         {
//             label: 'Resources',
//             children: [
//                 { label: 'Research Guidelines', href: '/research-guidelines' },
//                 { label: 'FAQ', href: '/faq' },
//             ],
//         },
//         {
//             label: 'Contact us',
//             href: '/contactuspage',
//         },
//         {
//             label: 'Blog',
//             href: '/blog1',

//         }
//     ];

//     return navItems.filter(item => {
//         if (item.label === 'Research Article Writing' && !shouldDisplayResearchArticleWriting) {
//             return false;
//         }
//         return true;
//     });
// };
"use client";
import {
    Box,
    Flex,
    Text,
    IconButton,
    Stack,
    Collapse,
    Link,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useDisclosure,
    Heading,
    HStack,
    Icon,
} from '@chakra-ui/react';
import logo from '../assets/Mattlogono2.png';
import {
    HamburgerIcon,
    CloseIcon,
    ChevronRightIcon,
    ChevronDownIcon,
} from '@chakra-ui/icons';
import Image from 'next/image';
 import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const { isOpen, onToggle } = useDisclosure();
    const pathname = usePathname();
    const NAV_ITEMS = getNavItems(pathname);

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <Box
            position="sticky"
            top={0}
            left={0}
            right={0}
            zIndex={10}
            bg={isScrolled ? useColorModeValue('white', 'gray.600'):'white'}
            transition="background-color 0.3s ease"
        >
            <Flex
                color={useColorModeValue('gray.600', 'white')}
                minH={{ base: '60px', sm: '70px', md: '80px', lg: '90px', xl: '100px' }}
                py={{ base: 2 }}
                px={{ base: 3, sm: 4, md: 6, lg: 8 }}
                borderBottom={1}
                borderStyle={'solid'}
                align={'center'}
                maxW="100vw"
                overflow="hidden"
            >
                <Flex
                    flex={{ base: 0, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}
                >
                    <IconButton
                        onClick={onToggle}
                        icon={
                            isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
                        }
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                        size={{ base: 'sm', sm: 'md' }}
                    />
                </Flex>
                
                <Flex 
                    justify={{ base: 'center', md: 'start' }} 
                    align="center"
                    flex={1}
                    overflow="hidden"
                >
                    <HStack 
                        spacing={{ base: 2, sm: 3, md: 4 }}
                        align="center"
                        flex={1}
                        maxW="100%"
                    >
                        <Box
                            width={{
                                base: "35px",
                                sm: "45px",
                                md: "60px",
                                lg: "75px",
                                xl: "90px",
                                "2xl": "95px",
                            }}
                            height={{
                                base: "35px",
                                sm: "45px",
                                md: "60px",
                                lg: "75px",
                                xl: "90px",
                                "2xl": "95px",
                            }}
                            ml={{ base: '0', md: '2', lg: '4' }}
                            position="relative"
                            flexShrink={0}
                        >
                            <Image
                                src={logo}
                                alt="Matt logo"
                                unoptimized={true}
                                layout="fill"
                                objectFit="contain"
                            />
                        </Box>
                        
                        <Link 
                            href='/' 
                            style={{ textDecoration: 'none' }}
                            flexShrink={1}
                            minW={0}
                        >
                            {/* <Heading
                                m={0}
                                as='h3'
                                fontSize={{
                                    base: '14px', 
                                    sm: '16px', 
                                    md: '18px', 
                                    lg: '20px', 
                                    xl: '22px', 
                                    '2xl': '25px'
                                }}
                                whiteSpace={{ base: 'nowrap', sm: 'normal' }}
                                overflow={{ base: 'hidden', sm: 'visible' }}
                                textOverflow={{ base: 'ellipsis', sm: 'clip' }}
                                
                            >
                                MATT RESEARCH SOLUTIONS
                            </Heading> */}
                            <Heading
  m={0}
  as="h3"
  fontSize={{
    base: '14px',
    sm: '16px',
    md: '18px',
    lg: '20px',
    xl: '22px',
    '2xl': '25px',
  }}
  w="200px" // 👈 fixed width
>
  MATT RESEARCH SOLUTIONS
</Heading>

                        </Link>
                        
                        <Flex 
                            display={{ base: 'none', lg: 'flex' }} 
                            ml={{ lg: 4, xl: 6, '2xl': 8 }}
                            flexShrink={0}
                        >
                            <DesktopNav navItems={NAV_ITEMS} />
                        </Flex>
                    </HStack>
                </Flex>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav navItems={NAV_ITEMS} />
            </Collapse>
        </Box>
    );
}

const DesktopNav = ({ navItems }) => {
    const linkColor = useColorModeValue('gray.600', 'gray.200');
    const linkHoverColor = useColorModeValue('gray.800', 'white');
    const popoverContentBgColor = useColorModeValue('white', 'gray.800');

    return (
        <Stack 
            direction={'row'} 
            spacing={{ lg: 2, xl: 3, '2xl': 4 }}
            wrap="nowrap"
            overflow="hidden"
        >
            {navItems.map((navItem) => (
                <Box key={navItem.label} flexShrink={0}>
                    <Popover trigger={'hover'} placement={'bottom-start'}>
                        <PopoverTrigger>
                            <Link
                                p={{ lg: 1, xl: 2 }}
                                href={navItem.href ?? '/'}
                                fontSize={{
                                    lg: '13px', 
                                    xl: '19px', 
                                    '2xl': '18px'
                                }}
                                fontWeight={600}
                                m={0}
                                color={linkColor}
                                _hover={{ textDecoration: 'none', color: linkHoverColor }}
                                whiteSpace="nowrap"
                                display="block"
                            >
                                {navItem.label}
                            </Link>
                        </PopoverTrigger>

                        {navItem.children && (
                            <PopoverContent
                                border={0}
                                boxShadow={'xl'}
                                bg={popoverContentBgColor}
                                p={4}
                                rounded={'xl'}
                                minW={'sm'}
                                maxW="300px"
                                zIndex={20}
                            >
                                <Stack>
                                    {navItem.children.map((child) => (
                                        <DesktopSubNav key={child.label} {...child} />
                                    ))}
                                </Stack>
                            </PopoverContent>
                        )}
                    </Popover>
                </Box>
            ))}
        </Stack>
    );
};

const DesktopSubNav = ({ label, href }) => (
    <Link
        href={href}
        role={'group'}
        display={'block'}
        p={2}
        rounded={'md'}
        _hover={{ bg: useColorModeValue('#425d81', 'gray.900') }}
    >
        <Stack direction={'row'} align={'center'}>
            <Box flex={1}>
                <Text
                    transition={'all .3s ease'}
                    _groupHover={{ color: 'white' }}
                    fontWeight={500}
                    fontSize="base"
                    noOfLines={1}
                >
                    {label}
                </Text>
            </Box>
            <Flex
                transition={'all .3s ease'}
                transform={'translateX(-10px)'}
                opacity={0}
                _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                justify={'flex-end'}
                align={'center'}
                flexShrink={0}
            >
                <Icon color={'white'} w={4} h={4} as={ChevronRightIcon} />
            </Flex>
        </Stack>
    </Link>
);

const MobileNav = ({ navItems }) => (
    <Stack 
        bg={useColorModeValue('white', 'gray.800')} 
        p={{ base: 3, sm: 4 }} 
        display={{ lg: 'none' }}
        maxH="70vh"
        overflowY="auto"
        spacing={2}
    >
        {navItems.map((navItem) => (
            <MobileNavItem key={navItem.label} {...navItem} />
        ))}
    </Stack>
);

const MobileNavItem = ({ label, children, href }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={2} onClick={children && onToggle}>
            <Flex
                py={2}
                as={Link}
                href={href ?? '#'}
                justify={'space-between'}
                align={'center'}
                _hover={{ textDecoration: 'none' }}
                borderRadius="md"
                px={2}
                // _hover={{ bg: useColorModeValue('gray.50', 'gray.700') }}
            >
                <Text 
                    fontWeight={600} 
                    color={useColorModeValue('gray.600', 'gray.200')}
                    fontSize={{ base: 'md', sm: 'lg' }}
                >
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={{ base: 5, sm: 6 }}
                        h={{ base: 5, sm: 6 }}
                        flexShrink={0}
                    />
                )}
            </Flex>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}
                    spacing={0}
                >
                    {children &&
                        children.map((child) => (
                            <Link 
                                key={child.label} 
                                py={2} 
                                px={2}
                                href={child.href}
                                fontSize={{ base: 'sm', sm: 'md' }}
                                color={useColorModeValue('gray.500', 'gray.300')}
                                _hover={{ 
                                    color: useColorModeValue('gray.700', 'white'),
                                    bg: useColorModeValue('gray.50', 'gray.700'),
                                    textDecoration: 'none'
                                }}
                                borderRadius="sm"
                                display="block"
                                width="100%"
                            >
                                {child.label}
                            </Link>
                        ))}
                </Stack>
            </Collapse>
           
        </Stack>
    );
};

interface NavItem {
    label: string;
    children?: Array<NavItem>;
    href?: string;
}

const getNavItems = (currentUrl) => {
    const shouldDisplayResearchArticleWriting = false;
    const navItems: NavItem[] = [
        {
            label: 'Home',
            href: '/' ,
        },
        {
            label: 'About Us',
            children: [
                { label: 'Who We Are', href: '/whatwedo' },
                { label: 'Our Process', href: '/ourprocesses' },
                { label: 'Why Choose Us', href: '/whychooseus' },
            ],
        },
        {
            label: 'Services',
            children: [
                { label: 'Research Proposal Writings', href: '/ServiceDetail/Research-Proposal-Writing' },
                { label: 'Literature Review & Research Design', href: '/ServiceDetail/Literature-Review-Research-Design' },
                { label: 'Thesis/Dissertation Writing', href: '/ServiceDetail/Thesis-and-Dissertation-Writing' },
                { label: 'Publication & Journal Support', href: '/ServiceDetail/Publication-Journal-Support' },
                { label: 'Data Collection & Analysis', href: '/ServiceDetail/Data-Collection-Analysis' },
                { label: 'Workshops & Training', href: '/ServiceDetail/Wrokshops-Training' },
                { label: 'Grant Writing & Ethical Compliance', href: '/ServiceDetail/Grant-Writing-Ethical-Compliance' },
                { label: 'Implementation Support', href: '/ServiceDetail/Project-Development-Implementation' },
            ],
        },
        {
            label: 'Projects',
            children: [
                { label: 'Case Studies', href: '/case-studies' },
                { label: 'Our Gallery', href: '/Our-Stroy' },
            ],
        },
        {
            label: 'Publications',
        },
        {
            label: 'Resources',
            children: [
                { label: 'Research Guidelines', href: '/research-guidelines' },
                { label: 'FAQ', href: '/faq' },
            ],
        },
        {
            label: 'Contact us',
            href: '/contactuspage',
        },
        {
            label: 'Blog',
            href: '/blog1',

        },
    ];

    return navItems.filter(item => {
        if (item.label === 'Research Article Writing' && !shouldDisplayResearchArticleWriting) {
            return false;
        }
        return true;
    });
};










































