import React from 'react'
import logo from "../assets/Inklune logo.png"
import twitter from "../assets/pajamas_twitter.png"
import instagramicon from "../assets/hugeicons_instagram.png"
import facebookicon from "../assets/basil_facebook-outline.png"
import mediumicon from "../assets/ri_medium-line.png"
import copy from "../assets/Footer Icon Container.png"

const Footer = () => {
  return (
    <div>
      <div className="container mx-auto w-11/12 py-12">
        <div className="text-center md:text-start items-center grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* first sec */}
          <div className="flex flex-col items-start gap-3">
            <img src={logo} alt="" className="mx-auto md:mx-0" />
            <p>
              A living archive of voices where ideas are planted, conversations
              bloom, and communities grow.
            </p>
            {/* set of logo */}
            <div className="flex gap-2 mx-auto md:mx-0">
              <img
                className="bg-[rgba(188,178,218,0.3)] p-3 rounded-[50%]"
                src={twitter}
                alt="x"
              />
              <img
                className="bg-[rgba(188,178,218,0.3)] p-3 rounded-[50%]"
                src={instagramicon}
                alt="instagram"
              />
              <img
                className="bg-[rgba(188,178,218,0.3)] p-3 rounded-[50%]"
                src={facebookicon}
                alt="facebook"
              />
              <img
                className="bg-[rgba(188,178,218,0.3)] p-3 rounded-[50%]"
                src={mediumicon}
                alt="medium"
              />
            </div>
          </div>
          {/* second sec */}
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">Explore</h3>
            <ul className="list-none space-y-2">
              <li>
                <a href="#">Featured Stories</a>
              </li>
              <li>
                <a href="#">Categories</a>
              </li>
              <li>
                <a href="#">Community Discussions</a>
              </li>
              <li>
                <a href="#">Writing Resources</a>
              </li>
              <li>
                <a href="#">Events & Workshops</a>
              </li>
            </ul>
          </div>
          {/* third sec */}
          <div className="flex flex-col gap-3 ">
            <h3 className="text-2xl font-semibold">Company</h3>
            <ul className="list-none space-y-2">
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Our Team</a>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Press</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          {/* four sec */}
          <div className="flex flex-col gap-3">
            <h3 className="text-2xl font-semibold">Company</h3>
            <ul className="list-none space-y-2">
              <li>
                <a href="#">Terms of Service</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Cookie Policy</a>
              </li>
              <li>
                <a href="#">Content Guidelines</a>
              </li>
              <li>
                <a href="#">Accessibility</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col text-sm md:flex-row py-5 justify-between container mx-auto w-11/12 ">
        <div className="flex gap-2">
          <span>
            <img src={copy} alt="" />
          </span>
          <p>2025 Inklune. All rights reserved</p>
        </div>
        <p>Write Under the Moon. Shine beyond the Stars</p>
      </div>
    </div>
  );
}

export default Footer