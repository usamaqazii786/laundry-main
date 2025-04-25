/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable jsx-a11y/anchor-is-valid */
import HomeSection01 from "../components/HomeSection01";
import Layout from "../components/Layout/Layout";

/* eslint-disable jsx-a11y/alt-text */
const HomePage = () => {
  return (
    <>
    <Layout>
      <div className=" loader-wrapper ">
        <div id="loading_logo">
          <div className="lds-roller">
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
      <div id="outer-wrap" className="site clr">
        <div id="wrap" className="clr">
          <HomeSection01 />
          <div className="owp-cart-overlay" />
        </div>
      </div>
      <div id="mobile-fullscreen" className="clr">
        <div id="mobile-fullscreen-inner" className="clr">
          <a
            href="https://thelaundryportal.com/#mobile-fullscreen-menu"
            className="close"
            aria-label="Close mobile menu"
          >
            <div className="close-icon-wrap">
              <div className="close-icon-inner" />
            </div>
          </a>
          <nav
            className="clr"
            itemScope="itemscope"
            itemType="https://schema.org/SiteNavigationElement"
            role="navigation"
          >
            <ul id="menu-main-menu-1" className="fs-dropdown-menu">
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-38 current_page_item menu-item-44">
                <a href="https://thelaundryportal.com/" aria-current="page">
                  Home
                </a>
              </li>
              <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-360">
                <a
                  href="https://thelaundryportal.com/#prices"
                  aria-current="page"
                >
                  Prices
                </a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-95">
                <a href="https://thelaundryportal.com/laundry-partners/">
                  Laundry Partners
                </a>
              </li>
              <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-348">
                <a
                  href="https://thelaundryportal.com/#who_are_we"
                  aria-current="page"
                >
                  About
                </a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-11">
                <a href="https://thelaundryportal.com/newsroom/">News Room</a>
              </li>
              <li className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-93">
                <a
                  href="https://thelaundryportal.com/#contactus"
                  aria-current="page"
                >
                  Contact
                </a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-573">
                <a href="https://thelaundryportal.com/?page_id=426">services</a>
              </li>
              <li className="woo-menu-icon wcmenucart-toggle-drop_down spacious toggle-cart-widget">
                <a
                  href="https://thelaundryportal.com/cart/"
                  className="wcmenucart wcmenucart-hide"
                >
                  <span className="wcmenucart-count">
                    <i
                      className=" fas fa-shopping-basket"
                      aria-hidden="true"
                      role="img"
                    />
                    <span className="wcmenucart-details count">0</span>
                  </span>
                </a>
                <div className="current-shop-items-dropdown owp-mini-cart clr">
                  <div className="current-shop-items-inner clr">
                    <div className="widget woocommerce widget_shopping_cart">
                      <div className="widget_shopping_cart_content" />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="mobile_popup">
        <div className="row align-items-center justify-content-left pt-3 pb-3">
          <div id="close_mob_popup" className="col-1 text-left ml-4">
            <svg
              width={12}
              height={12}
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1.35355"
                y1="0.646508"
                x2="11.3892"
                y2="10.6822"
                stroke="white"
              />
              <line
                x1="0.646447"
                y1="10.6821"
                x2="10.6821"
                y2="0.646422"
                stroke="white"
              />
            </svg>
          </div>
          <div className="col-5 pr-0">You’re one tap away!</div>
          <div className="col-3 text-right">
            <a href="#" className="mobiledownload">
              <div className="mobile_popup_btn mr-5">
                <img
                  width={300}
                  height={300}
                  className="mobile_popup_logo"
                  src="data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20300%20300'%3E%3C/svg%3E"
                  alt="Download"
                  data-lazy-src="https://thelaundryportal.com/wp-content/themes/byEnero/img/Laundry-portal-favicon-min.png.webp"
                />
                <noscript>
                  &lt;img width="300" height="300" class="mobile_popup_logo"
                  src="https://thelaundryportal.com/wp-content/themes/byEnero/img/Laundry-portal-favicon-min.png.webp"
                  alt="Download"&gt;
                </noscript>
                Install
              </div>
            </a>
          </div>
        </div>
      </div>
      </Layout>
    </>
  );
};

export default HomePage;
