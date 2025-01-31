import "../components/navbarStyling.css";
/* temporarely */
import lena from "../images/Lena.png";
import mariia from "../images/mariia.png";
import mine from "../images/Mine.png";
import image1 from "../images/cactus.png";
import image2 from "../images/icon-rice.png";
import image3 from "../images/sakura.png";
import whatsNext from "../images/seed.png";
import rulesIcon from "../images/medicine.png";
import fossil from "../images/fossil.png";
import "../assets/Forms.css";

const HomePage = () => {
  return (
    <div className="main-content">
      <h1 className="h1">Welcome to the Plant Blog!</h1>
      <div className="homePageCards">
        <div className="toBlogsCard card">
          <div className="toblogsImg">
            <img src={image1} className="HPimage img1" />
            <img src={image2} className="HPimage img2" />
            <img src={image3} className="HPimage img3" />
          </div>
          <h2>Check out the blog posts</h2>
        </div>

        <div className="toNewBlogCard card">
          <h2>Create a new blog post</h2>
          <img src={whatsNext} alt="newBlogIcon" className="HPimage" />
        </div>

        <div className="toDiscover card">
          <img src={fossil} alt="toRulesImg" className="HPimage" />
          <h2>Discover something new in the world of plants</h2>
        </div>

        <div className="toRulesCard card">
          <h2>Read the rules</h2>
          <img src={rulesIcon} alt="toRulesImg" className="HPimage" />
        </div>

        <div className="toAboutUsCard card">
          <div className="toAboutUsImg">
            <img src={lena} className="HPimage img1" />
            <img src={mariia} className="HPimage img2" />
            <img src={mine} className="HPimage img3" />
          </div>
          <h2>Learn about the web developers</h2>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
