import Mine from "../images/MinePng.png";
import Lena from "../images/LenaPng.png";
import Mariia from "../images/MariiaPng.png";

const AboutUsPage = () => {
  return (
    <>
      <section className="ourStory">
        <h2 className="h2">About us</h2>
        <div className="justUs">
          <div id="minesDiv">
            <img src={Mine} alt="Mine photo" />
            <h3>Mine's story</h3>
            <p>
              Born and raised in Turkey, I had the privilege of growing up
              surrounded by rich culture, warm hospitality, and breathtaking
              landscapes and plenty of chaos. Ten years ago, I embarked on a new
              chapter in Germany, where I've been living ever since. Whether
              it's listening to my favourite tunes or discovering new artists,
              or the numerous live gigs and concerts, or my amateur level guitar
              playing, music has always been my constant companion. It's my
              escape, my inspiration, and my way of connecting with the world. I
              have a big soft spot for animals – they make the world a kinder
              and more beautiful place. Whether it’s spending time with pets or
              admiring wildlife, animals remind me of the beauty of nature.
              Staying curious, asking questions, and growing every step of the
              way and learning new skills are vital. That’s how I found myself
              enrolling at Ironhack bootcamp in a turbulent period of my life :)
            </p>
          </div>
          <div id="mariiasDiv">
            <img src={Mariia} alt="Mariia's slack profile picture" />
            <h3>Mariia Tararaeva's story</h3>
            <p>
              My name is Mariia Tararaeva, and I am an enthusiastic programmer
              with a UX background and a business degree in my pocket. A few
              years ago, I made a move to the Netherlands from Russia with my
              family. Over the past two years, I worked in web design and
              low-code platforms, bettering my skills and expanding my expertise
              in the tech industry. Driven by continuous learning and growth, I
              am now transitioning into a full-stack developer role. This
              evolution allows me to combine business context technical skills
              to create comprehensive and effective digital solutions.
            </p>
          </div>
          <div id="lenasDiv">
            <img src={Lena} alt="Lena photo" />
            <h3>Lena Cortes' story</h3>
            <p>
              Lena Cortés, born and raised in Valencia, Spain, has always had a
              passion for exploring new places. Her love for travel has taken
              her to various corners of the world, where she’s immersed herself
              in different cultures and experiences. Despite her busy life as an
              avid traveler, Lena decided to expand her horizons even further by
              diving into the world of programming.
            </p>

            <p>
              Recently, she enrolled in Ironhack’s bootcamp, eager to learn
              coding and embrace a new challenge. Although it was a big shift
              from her usual lifestyle, Lena was determined to succeed. The
              problem-solving aspect of coding intrigued her, and she found
              herself captivated by the endless possibilities it offered.
            </p>

            <p>
              Now, Lena is balancing her passion for travel with her newfound
              interest in tech, learning to code by day and dreaming of her next
              adventure by night. She’s excited to see where both her journey as
              a coder and her travels will take her.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUsPage;
