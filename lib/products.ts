import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "basic-individual",
    name: "Basic Individual Plan",
    price: 149,
    icon: "Shield",
    description:
      "Essential coverage for individuals seeking basic medical protection. Includes doctor visits, emergency care, and generic prescriptions.",
    features: [
      "Annual health checkup",
      "Emergency room coverage",
      "Generic prescription drugs",
      "Telemedicine consultations",
    ],
    coverage: {
      maxCoverage: 50000,
      deductible: 2000,
      coinsurance: 30,
    },
  },
  {
    id: "family-plus",
    name: "Family Plus Plan",
    price: 449,
    icon: "Users",
    description:
      "Comprehensive family coverage for up to 6 members. Includes pediatric care, maternity benefits, and preventive health services.",
    features: [
      "Covers up to 6 family members",
      "Maternity and newborn care",
      "Pediatric services",
      "Dental and vision checkups",
      "Mental health support",
    ],
    coverage: {
      maxCoverage: 250000,
      deductible: 3000,
      coinsurance: 20,
    },
  },
  {
    id: "premium-gold",
    name: "Premium Gold Plan",
    price: 299,
    icon: "Award",
    description:
      "Enhanced individual coverage with lower out-of-pocket costs and access to a wider network of healthcare providers.",
    features: [
      "Nationwide provider network",
      "Specialist visits without referral",
      "Brand-name prescriptions",
      "Preventive care services",
      "Physical therapy coverage",
    ],
    coverage: {
      maxCoverage: 150000,
      deductible: 1000,
      coinsurance: 15,
    },
  },
  {
    id: "senior-care",
    name: "Senior Care Plan",
    price: 379,
    icon: "Heart",
    description:
      "Specialized coverage for seniors aged 60+. Includes chronic condition management, home healthcare, and comprehensive prescription coverage.",
    features: [
      "Chronic disease management",
      "Home healthcare services",
      "Comprehensive prescription coverage",
      "Medical equipment coverage",
      "24/7 nurse hotline",
    ],
    coverage: {
      maxCoverage: 200000,
      deductible: 1500,
      coinsurance: 20,
    },
  },
  {
    id: "critical-illness",
    name: "Critical Illness Protection",
    price: 89,
    icon: "AlertCircle",
    description:
      "Supplemental coverage providing lump-sum payment upon diagnosis of critical illnesses like cancer, heart attack, or stroke.",
    features: [
      "Lump-sum payout on diagnosis",
      "Covers major critical illnesses",
      "No restrictions on fund usage",
      "Second opinion coverage",
      "Cancer care coordination",
    ],
    coverage: {
      maxCoverage: 100000,
      deductible: 0,
      coinsurance: 0,
    },
  },
  {
    id: "platinum-executive",
    name: "Platinum Executive Plan",
    price: 599,
    icon: "Star",
    description:
      "Premium comprehensive coverage with concierge services, global coverage, and minimal out-of-pocket expenses.",
    features: [
      "Global healthcare coverage",
      "Concierge medical services",
      "Private hospital room coverage",
      "Alternative medicine coverage",
      "Wellness program membership",
      "Zero wait time for appointments",
    ],
    coverage: {
      maxCoverage: 500000,
      deductible: 500,
      coinsurance: 10,
    },
  },
  {
    id: "student-health",
    name: "Student Health Plan",
    price: 79,
    icon: "GraduationCap",
    description:
      "Affordable coverage designed for students aged 18-26. Includes mental health support, preventive care, and emergency services.",
    features: [
      "Mental health counseling",
      "Campus clinic coverage",
      "Emergency medical evacuation",
      "Preventive care services",
      "Prescription drug coverage",
    ],
    coverage: {
      maxCoverage: 75000,
      deductible: 1500,
      coinsurance: 25,
    },
  },
  {
    id: "dental-vision",
    name: "Dental & Vision Plus",
    price: 45,
    icon: "Eye",
    description:
      "Supplemental coverage for dental and vision care. Includes routine checkups, cleanings, and prescription eyewear.",
    features: [
      "2 dental cleanings per year",
      "Annual eye exam",
      "Prescription eyewear allowance",
      "Orthodontic coverage",
      "Emergency dental care",
    ],
    coverage: {
      maxCoverage: 5000,
      deductible: 50,
      coinsurance: 20,
    },
  },
  {
    id: "maternity-newborn",
    name: "Maternity & Newborn Care",
    price: 199,
    icon: "Baby",
    description:
      "Specialized coverage for expectant mothers and newborns. Includes prenatal care, delivery, and postnatal support.",
    features: [
      "Prenatal visits and tests",
      "Hospital delivery coverage",
      "Newborn care for 30 days",
      "Lactation consultant services",
      "Postnatal depression screening",
    ],
    coverage: {
      maxCoverage: 100000,
      deductible: 1000,
      coinsurance: 15,
    },
  },
  {
    id: "accident-only",
    name: "Accident Protection Plan",
    price: 35,
    icon: "Activity",
    description:
      "Affordable coverage specifically for accident-related injuries. Ideal as supplemental protection for active individuals.",
    features: [
      "Emergency room visits",
      "Ambulance services",
      "Fracture and dislocation coverage",
      "Physical therapy",
      "Medical equipment rental",
    ],
    coverage: {
      maxCoverage: 25000,
      deductible: 500,
      coinsurance: 0,
    },
  },
];
