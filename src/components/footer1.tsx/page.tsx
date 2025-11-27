import { Button } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footereds = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <footer>
        {/* Fixed inline background color */}
        <div className="footer-areased" style={{ backgroundColor: "#02428d" }}>
          <div className="container">
            <div className="footer-padding">
              <div className="row justify-content-between align-items-start pt-4">

                {/* ========= Company Info ========= */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 mb-4">
                  <div className="single-footer-caption">
                     <div className="footer-logo mb-3">
                      <a className="text-decoration-none a-logo" href="#">
                        <h6 className="fw-bold fst-italic fs-5 text-white">
                          {/* <Image
                            src="/favicon/mattlogo0.png"
                            alt="Matt logo"
                            width={30}
                            height={24}
                            className="d-inline-block me-1"
                          /> */}
                          <Image
  src="/favicon/mattlogo0.png"
  alt="Matt logo"
  width={30}
  height={24}
  className="d-inline-block me-1 bg-white p-1 rounded"
/>

                          Matt Research Solutions
                        </h6>
                      </a>
                    </div> 
                    

                    <div className="footer-tittle text-white">
                      <p className="fw-bold mb-2">
                        3rd floor, Pillars gates, Vadasery, Tamil Nadu 629001
                      </p>
                      <p className="fw-bold mb-2">
                        1st Floor, Quality Bakers, HMT Junction, Kalamassery,
                        Ernakulam-683104
                      </p>
                      <p className="fw-bold mb-2">
                        {/* <i className="bi bi-envelope bg-white  me-2 "></i> */}
                        
                        Email: info@mattengg.com
                      </p>
                      <p className="fw-bold mb-0">
                        {/* <i className="bi bi-telephone me-2"></i> */}
                        Phone: 8825735141, 8547486582
                      </p>
                    </div>
                  </div>
                </div>

                {/* ========= Services ========= */}
                <div className="col-xl-3 col-lg-3 col-md-6 col-sm-12 mb-4">
                  <div className="single-footer-caption">
                    <div className="footer-tittle">
                      <h6 className="text-white fw-bold fst-italic fs-5">
                        Services
                      </h6>
                      <div className="lines mb-2"></div>
                      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                        {[
                          "Research article writing",
                          "Review Article writing/Editing",
                          "Thesis/Dissertation writing",
                          "Publication support",
                          "Phd end to end assistance",
                          "Proposal writing/Editing",
                          "Plagiarism free writing/Editing",
                          "Proofreading services",
                          "Project development/implementation",
                        ].map((service, index) => (
                          <li key={index} className="mb-1">
                            <Link
                              className="text-decoration-none text-white fw-bold"
                              href={`/ServiceDetail?keyword=${encodeURIComponent(
                                service
                              )}`}
                            >
                              {service}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* ========= Quick Links ========= */}
                <div className="col-xl-2 col-lg-3 col-md-6 col-sm-12 mb-4">
                  <div className="single-footer-caption">
                    <div className="footer-tittle">
                      <h6 className="text-white fw-bold fst-italic fs-5">
                        Quick Links
                      </h6>
                      <div className="line mb-2"></div>
                      <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
                        <li>
                          <a href="#" className="text-white fw-bold text-decoration-none">
                            Conferences 2023
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-white fw-bold text-decoration-none">
                            Our Profile
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-white fw-bold text-decoration-none">
                            Enquiry Form
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-white fw-bold text-decoration-none">
                            Contact Us
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-white fw-bold text-decoration-none">
                            About Us
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-white fw-bold text-decoration-none">
                            Blog
                          </a>
                        </li>
                        <li>
                          <Link href="/PrivacyPolicy" className="text-white fw-bold text-decoration-none">
                            Privacy Policy
                          </Link>
                        </li>
                        <li>
                          <Link href="/TermsandConditions" className="text-white fw-bold text-decoration-none">
                            Terms of Use
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* ========= Quick Contact ========= */}
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="single-footer-caption">
                    <div className="footer-tittle">
                      <h6 className="text-white fw-bold fst-italic fs-5">
                        Quick Contact
                      </h6>
                      <div className="line2 mb-3"></div>
                      <form
                        className="w-100"
                        method="post"
                        action="footback.php"
                        encType="multipart/form-data"
                      >
                        <div className="row">
                          {[
                            { name: "name", placeholder: "Enter Your Name" },
                            { name: "email", placeholder: "Enter Your Email Id" },
                            { name: "country", placeholder: "Country" },
                            { name: "phone", placeholder: "Phone Number" },
                            { name: "requirement", placeholder: "Requirement" },
                            { name: "pttd", placeholder: "Preferred Time to Discuss" },
                          ].map((field, i) => (
                            <div key={i} className="col-sm-6 p-1">
                              <div className="input-group mb-1">
                                <input
                                  type="text"
                                  className="form-control p-2"
                                  placeholder={field.placeholder}
                                  name={field.name}
                                  required
                                />
                              </div>
                            </div>
                          ))}
                          <div className="col-sm-12 mt-2">
                            <Button
                              color="black"
                              type="submit"
                              bgGradient="linear(to-r, #e0a72b 10%, #be000a 50%)"
                              bgSize="200% 100%"
                              bgPosition="left bottom"
                              transition="all 0.4s ease"
                              _hover={{
                                bgPosition: "right bottom",
                                color: "white",
                              }}
                              width="100%"
                            >
                              Submit
                            </Button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* ========= Footer Bottom ========= */}
            <hr className="text-white" />
            <div className="footer-bottom pb-4">
              <div className="row align-items-center">
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 mb-2">
                  <p className="text-white fst-italic fw-bold mb-0">
                    © {currentYear} Matt Engineering Solutions. All Rights Reserved.
                  </p>
                </div>

                <div className="col-xl-8 col-lg-8 col-md-6 col-sm-12 text-end">
  <span className="fs-6 fw-bold text-white">Follow us: </span>
  &nbsp;
  {[
    { href: "https://www.facebook.com/mattenggsolutions", icon: "facebook" },
    { href: "https://www.linkedin.com/company/mattengineeringsolutions", icon: "linkedin" },
    { href: "https://twitter.com/mattenggsoln", icon: "twitter" },
    { href: "https://pin.it/7DuKJdW", icon: "pinterest" },
    { href: "https://www.instagram.com/mattengineering", icon: "instagram" },
    { href: "https://youtube.com/c/MattEngineeringEquipments", icon: "youtube" },
  ].map((social, index) => (
    <Link
      key={index}
      href={social.href}
      target="_blank"
      className="social-icon mx-1"
    >
      <i className={`bi bi-${social.icon}`}></i>
    </Link>
  ))}
</div>

              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footereds;
