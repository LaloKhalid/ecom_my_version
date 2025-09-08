import React from "react";
import Link from "next/link";
import Image from "next/image";
import * as Icon from "@phosphor-icons/react/dist/ssr";

import footerJson from "../../../src/data/footer.json";
import { FooterConfig } from "../../../lib";

const Footer = () => {
  const footerConfig = footerJson as FooterConfig;

  return (
    <div id="footer" className="footer">
      <div className="footer-main bg-surface">
        <div className="container">
          <div className="content-footer py-[60px] flex justify-between flex-wrap gap-y-8">
            {/* LEFT SIDE - LOGO + CONTACT INFO */}
            <div className="company-infor basis-1/4 max-lg:basis-full pr-7">
              <Link href={"/"} className="logo">
                <div className="heading4">Anvogue</div>
              </Link>
              <div className="flex gap-3 mt-3">
                <div className="flex flex-col">
                  {footerConfig.subLogoList.map((item, idx) => {
                    const href =
                      item.type === "email"
                        ? `mailto:${item.content}`
                        : item.type === "phone"
                        ? `tel:${item.content}`
                        : undefined;

                    return href ? (
                      <a
                        key={idx}
                        href={href}
                        className={idx === 0 ? "" : "mt-3"}
                      >
                        {item.content}
                      </a>
                    ) : (
                      <span
                        key={idx}
                        className={idx === 0 ? "" : "mt-3"}
                      >
                        {item.content}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* RIGHT SIDE - NAV GROUPS + NEWSLETTER */}
            <div className="right-content flex flex-wrap gap-y-8 basis-3/4 max-lg:basis-full">
              {/* NAV GROUPS */}
              <div className="list-nav flex justify-between basis-2/3 max-md:basis-full gap-4">
                {footerConfig.navGroups.map((group, gIdx) => (
                  <div
                    key={gIdx}
                    className="item flex flex-col basis-1/3 "
                  >
                    <div className="text-button-uppercase pb-3">
                      {group.title}
                    </div>
                    {group.items.map((nav, nIdx) => (
                      <Link
                        key={nIdx}
                        className={`caption1 has-line-before duration-300 w-fit ${
                          nIdx === 0 ? "" : "pt-2"
                        }`}
                        href={nav.link}
                      >
                        {nav.title}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>

              {/* NEWSLETTER */}
              <div className="newsletter basis-1/3 pl-7 max-md:basis-full max-md:pl-0">
                <div className="text-button-uppercase">
                  {footerConfig.newsLetter.title}
                </div>
                <div className="caption1 mt-3">
                  {footerConfig.newsLetter.description}
                </div>
                <div className="input-block w-full h-[52px] mt-4">
                  <form className="w-full h-full relative" action="post">
                    <input
                      type="email"
                      placeholder={footerConfig.newsLetter.placeholder}
                      className="caption1 w-full h-full pl-4 pr-14 rounded-xl border border-line"
                      required
                    />
                    <button className="w-[44px] h-[44px] bg-black flex items-center justify-center rounded-xl absolute top-1 right-1">
                      <Icon.ArrowRight size={24} color="#fff" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER BOTTOM */}
          <div className="footer-bottom py-3 flex items-center justify-between gap-5 max-lg:justify-center max-lg:flex-col border-t border-line">
            <div className="left flex items-center gap-8">
              <div className="copyright caption1 text-secondary">
                ©2023 Anvogue. All Rights Reserved.
              </div>
            </div>
            <div className="right flex items-center gap-2">
              <div className="caption1 text-secondary">Payment:</div>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="payment-img">
                  <Image
                    src={`/images/payment/Frame-${i}.png`}
                    width={500}
                    height={500}
                    alt={"payment"}
                    className="w-9"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
