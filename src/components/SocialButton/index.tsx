import { FunctionComponent, h } from "preact";
import styles from "./styles.scss";

type socialTypes = Record<string, Record<"label" | "link" | "srcname", string>>;
const socialTypes: socialTypes = {
  GitHub: {
    label: "GitHub",
    link: "https://github.com/canoypa",
    srcname: "github",
  },
  NPM: {
    label: "NPM",
    link: "https://npmjs.com/~cano",
    srcname: "npm",
  },
  Qiita: {
    label: "Qiita",
    link: "https://qiita.com/canoypa",
    srcname: "qiita",
  },
  Twitter: {
    label: "Twitter",
    link: "https://twitter.com/canoypa",
    srcname: "twitter",
  },
};

type Props = {
  type: string;
};
export const SocialButton: FunctionComponent<Props> = ({ type }) => {
  const social = socialTypes[type];

  return (
    <a href={social.link} class={styles.link}>
      <div class={styles.wrapper}>
        <div class={styles.primary}>
          <picture class={styles.picture}>
            <source
              type="image/webp"
              srcset={`./assets/logos/${social.srcname}.webp`}
            />
            <img
              src={`./assets/logos/${social.srcname}.png`}
              width="32"
              height="32"
              alt={`${social.label} logo`}
            />
          </picture>
          <span>{social.label}</span>
        </div>
      </div>
    </a>
  );
};
