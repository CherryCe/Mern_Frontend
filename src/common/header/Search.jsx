import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchProduct } from "../../redux/slides/productSlide";
import {
  WrapperContentPopup,
  WrapperHeaderAccout,
  WrapperTextHeaderSmall,
} from "../../components/HeaderCompoent/style";
import * as UserService from "../../services/UserService";
import { resetUser } from "../../redux/slides/userSlide";
import Loading from "../../components/LoadingComponent/Loading";
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Popover } from "antd";
import * as message from "../../components/Message/Message";

const Search = () => {
  // fixed Header
  // window.addEventListener("scroll", function () {
  //   const search = document.querySelector(".search");
  //   search.classList.toggle("active", window.scrollY > 100);
  // });

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [search, setSearch] = useState("");
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const order = useSelector((state) => state.order);
  const [loading, setLoading] = useState(false);

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleLogout = async () => {
    setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    message.success("Logout complete!!!");
    navigate("/sign-in");
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    setUserName(user?.name);
    setUserAvatar(user?.avatar);
    setLoading(false);
  }, [user?.name, user?.avatar]);

  const content = (
    <div>
      <WrapperContentPopup onClick={() => handleClickNavigate("profile")}>
        <i class="fa-solid fa-circle-info"></i> Account
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup onClick={() => handleClickNavigate("admin")}>
          <i class="fa-solid fa-gear"></i> System Manager
        </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={() => handleClickNavigate("my-order")}>
        <i class="fa-solid fa-money-bill"></i> My Order
      </WrapperContentPopup>
      <WrapperContentPopup onClick={() => handleClickNavigate("log-out")}>
        <i class="fa-solid fa-right-from-bracket"></i> Logout
      </WrapperContentPopup>
    </div>
  );

  const handleClickNavigate = (type) => {
    if (type === "profile") {
      navigate("/profile-user");
    } else if (type === "admin") {
      navigate("/system/admin");
    } else if (type === "my-order") {
      navigate("/my-order", {
        state: {
          id: user?.id,
          token: user?.access_token,
        },
      });
    } else if (type === "log-out") {
      handleLogout();
    }
    setIsOpenPopup(false);
  };

  const onSearch = (e) => {
    setSearch(e.target.value);
    dispatch(searchProduct(e.target.value));
  };

  return (
    <>
      <section className="search">
        <div className="container c_flex">
          <div className="logo width ">
            <Link to="/">
              <img src={logo} alt="" />
            </Link>
          </div>

          <div className="search-box f_flex">
            <input
              type="text"
              placeholder="Search and hit enter..."
              onChange={onSearch}
            />
            <span>All Category</span>
          </div>

          <div
            className="icon f_flex width"
            style={{ justifyContent: "center", alignItems: "center" }}
          >
            <Loading isLoading={loading}>
              <WrapperHeaderAccout>
                {userAvatar ? (
                  <img
                    src={userAvatar}
                    alt="avatar"
                    style={{
                      height: "30px",
                      width: "30px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <UserOutlined
                    className="icon-circle"
                    style={{ color: "#000" }}
                  />
                )}
                {user?.access_token ? (
                  <>
                    <Popover
                      content={content}
                      trigger="click"
                      open={isOpenPopup}
                    >
                      <div
                        style={{
                          cursor: "pointer",
                          maxWidth: 100,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          color: "#000",
                          fontWeight: "bold",
                        }}
                        onClick={() => setIsOpenPopup((prev) => !prev)}
                      >
                        {userName?.length ? userName : user?.email}
                      </div>
                    </Popover>
                  </>
                ) : (
                  <div
                    onClick={handleNavigateLogin}
                    style={{ cursor: "pointer" }}
                  >
                    <WrapperTextHeaderSmall>
                      Sign In | Sign Up
                    </WrapperTextHeaderSmall>
                    <div>
                      <WrapperTextHeaderSmall>Account</WrapperTextHeaderSmall>
                      <CaretDownOutlined />
                    </div>
                  </div>
                )}
              </WrapperHeaderAccout>
            </Loading>
            <div className="cart">
              <Link to="/order">
                <i className="fa fa-shopping-bag icon-circle"></i>
                <span>{order?.orderItems?.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;
