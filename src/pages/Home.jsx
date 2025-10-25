import Hero from "../components/Hero";
import NewsletterPopup from "../components/NewsletterPopup";
import chairPhoto from "../assets/popupp.jpeg";
import ShippingMarquee from "../components/ShippingMarquee";
import DiscoverCategories from "../components/DiscoverCategory";
export default function Home() {    
    return (
        <div>
            <Hero />
            <ShippingMarquee />
            <DiscoverCategories activeIndex={1} onSelect={(c) => console.log(c)} />
              <NewsletterPopup imageSrc={chairPhoto} delayMs={10000} /* oncePerSession */ />
        </div>
    );
}