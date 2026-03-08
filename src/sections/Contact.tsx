import classNames from "classnames";
import { accentContainer } from "../stylizers";
import { Quote } from "../components/Quote";

const Contact: React.FC = () => {
  return (
    <section
      id="contact"
      className="flex p-8 pb-20 min-h-[100vh] gap-8 flex-wrap justify-center"
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
          <p className="mb-2">
            <a
              href="https://t.me/C0deCat"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              @C0deCat
            </a>
          </p>
          <p>
            <a
              href="https://github.com/C0deCat"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Github
            </a>
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center gap-8 basis-xs">
        <Quote
          text="A very cool developer who doesn't need supervision"
          author="Gennady Bikeev"
          position="Frontend Team Lead at Infomaximum"
        />
      </div>
      <div className="flex flex-col justify-center gap-8 basis-xs">
        <Quote
          text="A very professional developer who was a pleasure to work with"
          author="Dmitry Tishin"
          position="Senior Frontend at Gazprombank"
        />
      </div>
    </section>
  );
};

export default Contact;
