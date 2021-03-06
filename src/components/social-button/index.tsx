import { FunctionComponent as FC, h } from "preact";
import styles from "./styles.scss";

const socialTypes = {
  GitHub: {
    label: "GitHub",
    link: "https://github.com/canoypa",
    srcName: "github",
  },
  NPM: {
    label: "NPM",
    link: "https://npmjs.com/~cano",
    srcName: "npm",
  },
  Qiita: {
    label: "Qiita",
    link: "https://qiita.com/canoypa",
    srcName: "qiita",
  },
  Twitter: {
    label: "Twitter",
    link: "https://twitter.com/canoypa",
    srcName: "twitter",
  },
} as const;

type SocialTypeKeys = keyof typeof socialTypes;

type Props = {
  type: SocialTypeKeys;
};
export const SocialButton: FC<Props> = ({ type }) => {
  const social = socialTypes[type];

  return (
    <a href={social.link} class={styles.link}>
      <div class={styles.wrapper}>
        <div class={styles.primary}>
          <picture class={styles.picture}>
            <source
              type="image/webp"
              srcset={`./_/assets/logos/${social.srcName}.webp`}
            />
            <img
              src={`./_/assets/logos/${social.srcName}.png`}
              width="32"
              height="32"
            />
          </picture>
          <span>{social.label}</span>
        </div>
      </div>
    </a>
  );
};
