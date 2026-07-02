import HomeResponsivePage from "./HomeResponsivePage";

export default function HomePage({ isLoggedIn }: { isLoggedIn: boolean }) {
  return <HomeResponsivePage isLoggedIn={isLoggedIn} />;
}
