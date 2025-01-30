import Mine from "../images/MinePng.png"
import Lena from "../images/LenaPng.png"
import Mariia from "../images/MariiaPng.png"

const AboutUsPage = () => {
  return (
    <>
      <section className="ourStory">
        <h2>About us</h2>
        <p>Hello and welcome!</p>

        <p>
          A text saying  we're the devs of the  app :D
        </p>

        <p>
          Thank you for visiting, and we hope you get to know a little bit about
          us here
        </p>
        <div className="justUs">
          <div id="minesDiv">
            <img src={Mine} alt="Mine photo" />
            <h3>Mine's story</h3>
            <p>
              Some randdom text to  edit later
            </p>
            <div id="mariiasDiv">
              <img src={Mariia} alt="Mariia's slack profile picture" />
              <h3>Mariia Tararaeva's story</h3>
              <p>Mariia Tararaeva, of Russian descent, grew up in Siberia, riding horses across the snowy landscapes. Her life changed when she moved to the Netherlands with her boyfriend, who encouraged her to try something new. One day, she heard about the Ironhack bootcamp and decided to start learning to code. <br />

                At first, coding felt challenging, but with the same determination she used while riding, Mariia ventured into the world of programming. Every day, she is becoming a programmer, solving problems and acquiring new skills. On weekends, she continues riding horses, enjoying the freedom she has always loved.</p>
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
        </div>
      </section>
    </>
  );
};

export default AboutUsPage;