import ContentLoader, { IContentLoaderProps } from "react-content-loader";

const TrxSkeleton = (props: IContentLoaderProps) => (
  <ContentLoader
    speed={2}
    viewBox="0 0 400 70"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    width={"100%"}
    height={"70px"}
    {...props}
  >
    {/* avatar */}
    <rect x="0" y="5" rx="16" ry="16" width="50" height="50" />
    {/* left */}
    <rect x="62" y="7" rx="3" ry="3" width="140" height="7" />
    <rect x="62" y="41" rx="3" ry="3" width="100" height="11" />
    <rect x="62" y="22" rx="3" ry="3" width="140" height="11" />
    {/* right */}
    <rect x="323" y="11" rx="3" ry="3" width="72" height="6" />
    <rect x="287" y="24" rx="8" ry="8" width="110" height="17" />
  </ContentLoader>
);

export default TrxSkeleton;
