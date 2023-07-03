type Props = {
    alt: string,
    src: string,
    cssClass?: string
}

const Logo: React.FC<Props> = ({alt, src, cssClass}: Props) => {
  return (
    <img
      className={cssClass ?? ''}
      alt={alt}
      src={src}
    ></img>
  );
}

export default Logo;
