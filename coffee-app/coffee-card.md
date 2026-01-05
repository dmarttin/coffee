Here is a comprehensive technical specification for the Coffee Product Detail Page (PDP). This document is formatted in Markdown, ready to be handed off to your frontend engineer.

---

# Frontend Specification: Coffee Product Detail Page (PDP)

## 1. Overview

This document outlines the frontend requirements for rebuilding the "Coffee Card" (Product Detail Page). The goal is to replicate the existing UI structure while improving code stability. The page is a long-form, vertical scroll view containing distinct content modules, with a focus on visual hierarchy, data visualization, and clear calls to action (CTA).

## 2. Layout & Architecture

* **Container:** Single vertical scroll view (e.g., `ScrollView` in React Native).
* **Navigation Bar (Top):**
* **Left:** `< Back Arrow` Icon.
* **Right:** `Share` Icon and `Cart` Icon (with notification badge).
* **Background:** Transparent initially, transitioning to solid white on scroll.



---

## 3. Component Breakdown

### A. Hero Section (Top Fold)

A composite grid layout displaying the product image, core stats, and primary actions.

* **Layout:** Two-column grid (approx 40% Left / 60% Right).
* **Left Column (Image):**
* **Product Image:** High-resolution vertical coffee bag shot.
* *Object-fit:* Contain.
* *Overlay:* A small "Scan" or "Camera" thumbnail overlay in the bottom left corner of the main image.




* **Right Column (Meta Data):**
* **Rating Block:**
* **Tooltip:** "That's about average" (Light blue pill, arrow pointing down).
* **Score:** Large typography (e.g., "3.7").
* **Stars:** 5-star row (Red/Maroon filled).
* **Count:** "933 ratings" (Grey, small text).


* **Match Score:**
* Small circular gauge icon.
* Text: "Calculate your personal match".


* **Action Row:**
* **Rate Button:** Outlined button, orange star icon, text "Rate".
* **Actions Button:** Outlined button, list/clipboard icon, text "Actions".




* **Bottom Meta (Full Width):**
* **Roaster Name:** "Nomad Coffee" (Grey, uppercase/small caps).
* **Coffee Name:** "Espresso El Salvador Las Brisas" (Large, Bold, Serif font).
* **Origin:** Flag icon (El Salvador) + "Collected in El Salvador, roasted in Spain".
* **Edit Action:** Pencil icon + "Change coffee" (Underlined link style).



### B. Purchase Module

A high-priority conversion block.

* **Price:** Large bold text "4.55 €" + small text "/200gr".
* **Primary CTA:** Full-width button.
* *Text:* "Buy now" (White, Bold).


### D. Summary Section

* **Header:** "Summary".
* **Tabs/Toggles:** Pill-shaped toggle switch.
* *State 1:* "Highlights" (Active: Black bg, White text).
* *State 2:* "Facts" (Inactive: White bg, Black text, Border).


* **Highlights List:**
* **Rank:** Pink circle icon | "Featured in **Top 25 coffees in the app**...".
* **Global Rank:** Gold star icon | "Among top 9% of all coffees in the world".
* **Style:** Bean icon | "You haven't tried this style yet...".



### E. Taste Characteristics

Data visualization for the coffee's profile.

* **Header:** "Taste characteristics" (with Edit pencil).
* **Subtext:** "Based on [X] user reviews".
* **Sliders (Read-Only):**
* Three horizontal progress bars.
* *Labels:* Light ↔ Bold | Dry ↔ Sweet | Soft ↔ Acidic.
* *UI:* Grey track background. Red active segment indicating the range. Thumb/Indicator is not a circle, but the endpoint of the red bar.


* **Flavor Tags (List):**
* *Header:* "What people talk about".
* *Rows:* Icon (Circle with illustration) + Bold Label (e.g., "Citrus, lemon, lime") + Count (e.g., "575 mentions of citrus fruit notes").
* *Action:* "Show more" (Red text).



### F. Reviews Module

* **Header:** "Reviews".
* **CTA:** "Add a new review" (Text link).
* **Filter Chips:** [Helpful] [Recent] (Outlined pills).
* **Review Card Component:**
* **User:** Avatar + Name + "Rated a wine".
* **Rating:** Yellow Badge with Star + Score (e.g., "3.7").
* **Content:** Text snippet. Truncated with "... read more".
* **Footer:** Like (Thumb icon) count, Comment icon count.


### H. Recipes

* **Header:** "Recommended Recipes".
* **Graph of recipies**: A star graphic with the different ways of making coffee, that is going to contain the votes of the people on that coffee. The categories are: Cold Brew, Decaffeinated, Espresso, Filter.

### J. Coffee Shop Info

* **Header:** "About [Name: e.g. "Nomad Coffee"]".
* **Card:**
* **Stats:** "44 coffees" | Rating badge (3.8) | Total ratings count.
* **Title in light gray**: "Find the stores here:".
* **Map:** Static image preview of "Barcelona, Spain" map. (Where the coffee shop is located).

### L. Recommendations (Footer)

* **Header:** "Similar wines you might like".
* **Layout:** Horizontal ScrollView (Carousel).
* **Card:** Bottle image, Rating badge (big circle), Title, Price.

---