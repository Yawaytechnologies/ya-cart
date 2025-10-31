import Hero from "../components/Hero";
import NewsletterPopup from "../components/NewsletterPopup";
import chairPhoto from "../assets/popupp.jpeg";
import ShippingMarquee from "../components/ShippingMarquee";
import DiscoverCategories from "../components/DiscoverCategory";
import TrendingThisSeason from "../components/Trending";
import HeroParallaxMasonry from "../components/HeroParallax";
import StickyShop from "../components/StickyProduct";
import CenterParallaxShowcase from "../components/Showcase";
import ReviewsMarquee from "../components/Review";
import StoreBenefits from "../components/StoreBenefits";
import ShopGram from "../components/ShopGram";
export default function Home() {    
    return (
        <div>
            <Hero />
            <ShippingMarquee />
            <DiscoverCategories activeIndex={1} onSelect={(c) => console.log(c)} />
                <TrendingThisSeason />
                <HeroParallaxMasonry />
                <StickyShop />
                <CenterParallaxShowcase />
                <ReviewsMarquee />
                <StoreBenefits />
                <ShopGram />
              <NewsletterPopup imageSrc={chairPhoto} delayMs={10000} /* oncePerSession */ />
        </div>
    );
}