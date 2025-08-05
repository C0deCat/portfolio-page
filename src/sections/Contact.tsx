import classNames from "classnames";
import { accentContainer } from "../stylizers";
import { Quote } from "../components/Quote";

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="flex p-8 min-h-[100vh] gap-8 flex-wrap justify-center"
    >
      <div className="flex flex-col justify-center basis-lg">
        <div className={classNames(accentContainer, "p-5")}>
          <h2 className="text-2xl uppercase mb-2">
            available for freelance and job opportunities
          </h2>
          <p className="text-xl mb-2">
            Have and exciting project or interesting opportunity?
          </p>
          <p className="text-xl">Contact me via email or message!</p>
        </div>
        <div className="text-2xl text-(--color-accent) p-5">
          <p className="mb-2">smolkin.vlsl@gmail.com</p>
          <p className="mb-2">@C0deCat</p>
          <p>Github</p>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-8 basis-xs">
        <Quote
          text="He is very cool!"
          author="Mark Marcus"
          position="Senior Developer at Company"
        />
      </div>
      <div className="flex flex-col justify-center gap-8 basis-xs">
        <Quote
          text="This is very big quote, that is likely to take up some space and perhaps even a few rows, this is so much text i don’t know what to do"
          author="Mark Marcus"
          position="Senior Developer at Company"
          textSize="text-xl"
          textAlign="text-left"
        />
        <Quote
          text="He is very cool!"
          author="Mark Marcus"
          position="Senior Developer at Company"
        />
      </div>
    </section>
  );
};

export default Contact;
