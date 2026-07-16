import foodSvg from "../assets/food.svg"
import othersSvg from "../assets/others.svg"
import servicesSvg from "../assets/services.svg"
import trasnportSvg from "../assets/transport.svg"
import accommodationSvg from "../assets/accommodation.svg"

export const CATEGORIES = {
  food: {
    name: "Alimentacão",
    icon: foodSvg
  },
  others: {
    name: "Outros",
    icon: othersSvg
  },
  services: {
    name: "Servicos",
    icon: servicesSvg
  },
  transport: {
    name: "Transporte",
    icon: trasnportSvg
  },
  accommodation: {
    name: "Acomodacão",
    icon: accommodationSvg
  },
}

export const CATEGORIES_KEYS = Object.keys(CATEGORIES) as Array< keyof typeof CATEGORIES >