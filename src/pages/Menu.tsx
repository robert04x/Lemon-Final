import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Grid3X3, List } from 'lucide-react';

const menuCategories = {
  'Bruschete / Bruschetta': [
    {
      ro: 'Bruschete cu roșii',
      en: 'Tomato Bruschetta',
      ingredients: 'Roșii 250g, pâine toast 80g, usturoi 10g, ulei de măsline 10ml, sare 3g, busuioc 2g (350g)',
      price: '20 Lei'
    },
    {
      ro: 'Bruschete cu somon',
      en: 'Smoked Salmon Bruschetta',
      ingredients: 'Somon fume 100g, lămâie 100g, cremă de brânză 80g, pâine toast 80g, sare 2g (360g)',
      price: '25 Lei'
    },
    {
      ro: 'Bruschete cu prosciutto',
      en: 'Prosciutto Bruschetta',
      ingredients: 'Prosciutto crudo, cremă de brânză, pâine toast (360g)',
      price: '25 Lei'
    },
    {
      ro: 'Bruschete roșii și mozzarella',
      en: 'Tomato and Mozzarella Bruschetta',
      ingredients: 'Bruschete cu roșii 1 porție, mozzarella 50g',
      price: '25 Lei'
    }
  ],
  'Humus': [
    {
      ro: 'Humus clasic',
      en: 'Classic Hummus',
      ingredients: 'Năut 1.5kg, tahina 400g, usturoi 35g, zeamă de lămâie 60ml, ulei de măsline 50ml, sare 15g, boia dulce 30g, pătrunjel 10g (300g)',
      price: '25 Lei'
    },
    {
      ro: 'Humus cu pui',
      en: 'Hummus with Chicken',
      ingredients: 'Hummus 200g, piept de pui la grătar 70g (350g)',
      price: '30 Lei'
    }
  ],
  'Platouri / Platters': [
    {
      ro: 'Platou de mezeluri italienesc',
      en: 'Italian Cold Cuts Platter',
      ingredients: 'Prosciutto crudo 50g, prosciutto cotto 50g, salam italian 50g, salam napoli 50g (400g)',
      price: '90 Lei'
    },
    {
      ro: 'Platou de brânzeturi',
      en: 'Cheese Platter',
      ingredients: 'Cașcaval, mozzarella, brânză de capră, gorgonzola, brie, nuci, struguri, miere (500g)',
      price: '70 Lei'
    },
    {
      ro: 'Platou rece',
      en: 'Cold Platter',
      ingredients: 'Salam uscat, șuncă afumată de casă, costiță afumată, salată de icre, zacuscă, vinete, legume, telemea de vacă, măsline (700g)',
      price: '100 Lei'
    },
    {
      ro: 'Platoul berarilor',
      en: 'Beer Lovers Platter',
      ingredients: 'Măsline pane, jalapeño murat, castravete murat, ciciarone porc, lipie crispy picantă, 2 sosuri (la alegere) (200g)',
      price: '70 Lei'
    },
    {
      ro: 'Platou 2 persoane',
      en: 'Platter for 2',
      ingredients: '2 mici, 250g ceafă de porc, 200g cârnați, cartofi prăjiți, salată murături, mujdei (600g)',
      price: '70 Lei'
    },
    {
      ro: 'Platou 4-6 persoane',
      en: 'Platter for 4-6',
      ingredients: '4 mici, 300g ceafă de porc, 200g cârnați, 200g pulpă de pui, 200g frigărui de pui, cartofi prăjiți, murături, mujdei (1000g)',
      price: '170 Lei'
    }
  ],
  'Ciorbe / Soups': [
    { 
      ro: 'Ciorbă de burtă', 
      en: 'Tripe soup',
      ingredients: 'Burtă proaspătă, smântână, ou, usturoi (400ml)',
      price: '20 Lei'
    },
    { 
      ro: 'Ciorbă de vacuță', 
      en: 'Beef soup',
      ingredients: 'Pulpă de vită 2kg, rasol de vită 2kg, ceapă 0.6kg, morcov 0.6kg, țelină 0.6kg, ardei gras 0.6kg, cartofi proaspăți 1kg, roșii decojite 0.8kg, borș 1L, sare 0.03kg, cub vită 0.1kg (400ml)',
      price: '17 Lei'
    },
    { 
      ro: 'Ciorbă a la grec cu perișoare din carne de pui', 
      en: 'Greek soup with chicken meatballs',
      ingredients: 'Ceapă 1kg, ardei gras 800g, morcov 800g, țelină 600g, ouă 30buc, smântână 3kg, carne tocată de pui 3kg, orez bob rotund 200g, sare 50g, piper 2g, mărar 10leg, zeamă lămâie 350ml, maggi cub găină 18buc (400ml)',
      price: '17 Lei'
    },
    { 
      ro: 'Gulaș din piept de rață afumat cu chimen și spumă de lapte', 
      en: 'Smoked duck breast goulash with cumin and milk foam',
      ingredients: 'Piept rață afumat, spumă de lapte, chimen (350ml)',
      price: '25 Lei'
    },
    { 
      ro: 'Supă cremă de legume', 
      en: 'Cream of vegetable soup',
      ingredients: 'Ceapă albă 2.5kg, morcov 4kg, ardei gras 1.5kg, țelină 3kg, dovlecel 1kg, cartofi proaspăți 5kg, cremă cucina 1L, unt 0.4L, sare 70g, ulei floarea soarelui 0.3L, croutons de pâine 1.4kg (400ml)',
      price: '17 Lei'
    },
    { 
      ro: 'Ciorbă de pui cu tăiței de casă', 
      en: 'Chicken soup with homemade noodles',
      ingredients: 'Piept de pui, ceapă, morcov, țelină, păstârnac, fasole verde, mazăre, tăiței de casă, verdeață (400ml)',
      price: '17 Lei'
    }
  ],
  'Mic dejun / Breakfast': [
    {
      ro: 'Omletă simplă',
      en: 'Plain omelette',
      ingredients: 'Ouă, sare, piper (150g)',
      price: '10 Lei'
    },
    {
      ro: 'Omletă quesadilla',
      en: 'Quesadilla omelette',
      ingredients: 'Ouă, quesadilla (piept de pui, cheddar ras, roșii, ardei gras, lipie, boia, usturoi, sare), sare, piper (350g)',
      price: '25 Lei'
    },
    {
      ro: 'Carcalete',
      en: 'Carcalete',
      ingredients: 'Cartofi prăjiți 1 porție, ouă 2buc, cârnați afumați 70g, mărar 3g, brânză telemea 50g',
      price: '25 Lei'
    }
  ],
  'Salate / Salads': [
    {
      ro: 'Salată Caesar',
      en: 'Caesar Salad',
      ingredients: 'Salată iceberg 200g, piept de pui 120g, sos Caesar 60g, croutons de pâine 40g, scaie de parmezan 20g (380g)',
      price: '35 Lei'
    },
    {
      ro: 'Salată Caesar cu crispy',
      en: 'Caesar Salad with Crispy Chicken',
      ingredients: 'Salată iceberg 200g, pui crispy 120g, sos Caesar 60g, roșii cherry 40g, croutons de pâine 40g, scaie de parmezan 20g (380g)',
      price: '40 Lei'
    },
    {
      ro: 'Salată grecească',
      en: 'Greek Salad',
      ingredients: 'Salată verde, brânză feta, roșie, castravete, ceapă roșie, măsline, oregano (200g)',
      price: '35 Lei'
    },
    {
      ro: 'Salată bulgărească',
      en: 'Bulgarian Salad',
      ingredients: 'Roșii 80g, salată 50g, brânză 50g, șuncă de Praga 50g, castraveți 40g, ardei gras 30g, ceapă 30g, măsline 25g, ou fiert 1buc, ulei 10ml, oțet 5ml, sare 2g, piper 1g (420g)',
      price: '35 Lei'
    },
    {
      ro: 'Salată cu somon',
      en: 'Salmon Salad',
      ingredients: 'Salată verde, somon, roșii cherry, ceapă roșie, castravete, măsline, capere (200g)',
      price: '40 Lei'
    },
    {
      ro: 'Salată de varză albă',
      en: 'White Cabbage Salad',
      ingredients: 'Varză albă 200g, mărar 5g, sare 2g, piper 1g, oțet 10ml (150g)',
      price: '8 Lei'
    },
    {
      ro: 'Salată de murături asortate',
      en: 'Mixed Pickles Salad',
      ingredients: 'Murături asortate (200g)',
      price: '10 Lei'
    },
    {
      ro: 'Salată verde',
      en: 'Green Salad',
      ingredients: 'Salată verde cu lămâie 100g, lămâie 20ml (150g)',
      price: '8 Lei'
    },
    {
      ro: 'Salată de ardei copt',
      en: 'Roasted Pepper Salad',
      ingredients: 'Ardei copt (150g)',
      price: '10 Lei'
    },
    {
      ro: 'Salată de sfeclă',
      en: 'Beetroot Salad',
      ingredients: 'Sfeclă (150g)',
      price: '8 Lei'
    },
    {
      ro: 'Salată coleslaw',
      en: 'Coleslaw Salad',
      ingredients: 'Varză, morcov (150g)',
      price: '10 Lei'
    },
    {
      ro: 'Salată asortată',
      en: 'Mixed Salad',
      ingredients: 'Roșii 100g, castravete 100g, ceapă 40g, ardei gras 40g, ulei 10ml, sare 2g',
      price: '12 Lei'
    },
    {
      ro: 'Salată de crudități',
      en: 'Raw Vegetable Salad',
      ingredients: 'Varză albă 4kg, varză roșie 0.75kg, morcov 0.5kg, țelină 0.75kg, miere 0.2kg, pătrunjel 3leg, ulei floarea soarelui 150ml, oțet 80ml, sare 30g',
      price: '10 Lei'
    }
  ],
  'Paste / Pasta': [
    {
      ro: 'Arrabiata',
      en: 'Arrabbiata',
      ingredients: 'Paste fierte 220g, sos napoli 260g, ulei măsline 30ml, măsline feliate 50g, peperoncino 1g, pătrunjel ¼ (450g)',
      price: '30 Lei'
    },
    {
      ro: 'Aglio olio e peperoncino',
      en: 'Aglio Olio e Peperoncino',
      ingredients: 'Paste, usturoi, ulei de măsline, peperoncino, parmezan, pătrunjel (450g)',
      price: '30 Lei'
    },
    {
      ro: 'A la chef',
      en: 'Chef\'s Special Pasta',
      ingredients: 'Paste, sos de unt, pui crocant picant (450g)',
      price: '35 Lei'
    },
    {
      ro: 'Quattro formaggi',
      en: 'Four Cheese Pasta',
      ingredients: 'Paste fierte 220g, sos quattro formaggi 260g, parmezan 30g (450g)',
      price: '35 Lei'
    },
    {
      ro: 'Carbonara',
      en: 'Carbonara',
      ingredients: 'Spaghete fierte 220g, cremă cucina 200g, bacon 70g, sare 2g, piper 2g, parmezan 30g, ou 1 gălbenuș (450g)',
      price: '40 Lei'
    },
    {
      ro: 'Paste cu fructe de mare',
      en: 'Seafood Pasta',
      ingredients: 'Mix fructe de mare, paste tagliatelle, sos pomodoro, usturoi (450g)',
      price: '45 Lei'
    },
    {
      ro: 'Siciliana al forno',
      en: 'Sicilian Baked Pasta',
      ingredients: 'Penne fierte 200g, ardei gras 30g, bacon 50g, ciuperci 30g, piept pui 100g, usturoi 2g, sare 2g, piper 1g, mozzarella 50g, sos napoli 150g (450g)',
      price: '45 Lei'
    },
    {
      ro: 'Tagliatelle cu creveți',
      en: 'Tagliatelle with Shrimp',
      ingredients: 'Paste, creveți, smântână, parmezan, unt, usturoi, sare, piper, pătrunjel (450g)',
      price: '45 Lei'
    }
  ],
  'Fel principal / Main Course': [
    {
      ro: 'Tochitură dobrogeană',
      en: 'Dobrogean Stew',
      ingredients: 'Ceafă de porc 1.3kg, kaizer afumat 1kg, piept de pui 700g, cârnați afumați 500g, bulion 500g, sare 20g, piper 10g, foi de dafin 7g, ou 1buc (per porție), mămăligă 1buc (per porție) (500g)',
      price: '40 Lei'
    },
    {
      ro: 'Tigaie picantă de pui',
      en: 'Spicy Chicken Pan',
      ingredients: 'Pulpe de pui dezosate, cârnați, sos napoli, ardei kapia, ardei iute, ceapă, pătrunjel, ulei, sare (400g)',
      price: '40 Lei'
    },
    {
      ro: 'Tigaie picantă de porc',
      en: 'Spicy Pork Pan',
      ingredients: 'Ceafă de porc 100g, piept de pui 100g, cârnați 70g, ardei kapia 40g, ardei iute 10g, sare 5g, piper 5g, sos napoli 70g, ulei 10ml, pătrunjel 3g (400g)',
      price: '40 Lei'
    },
    {
      ro: 'Pomana porcului',
      en: 'Traditional Pork Feast',
      ingredients: 'Ceafă de porc 300g, condiment grătar 30g, ulei 10g, mămăligă 1 porție, murături 100g (400g)',
      price: '40 Lei'
    },
    {
      ro: 'Valdostana de pui',
      en: 'Chicken Valdostana',
      ingredients: 'Piept de pui, smântână, piure de cartofi, ciuperci, sare, piper (400g)',
      price: '40 Lei'
    },
    {
      ro: 'Pui cu gorgonzola',
      en: 'Chicken with Gorgonzola',
      ingredients: 'Piept de pui 250g, cremă cucina 150g, gorgonzola 50g, sare 2g, piper 2g, parmezan 10g',
      price: '40 Lei'
    },
    {
      ro: 'Pui cu smântână și ciuperci',
      en: 'Chicken with Cream and Mushrooms',
      ingredients: 'Piept pui 250g, ciuperci 80g, pastă trufe 20g, cremă cucina 150g, unt 30g, piper 2g, sare 2g, usturoi 10g, parmezan 10g',
      price: '40 Lei'
    },
    {
      ro: 'Sarmale în foi de varză',
      en: 'Cabbage Rolls',
      ingredients: 'Carne tocată de vită, orez, ulei, mămăligă, ardei iute (5 buc)',
      price: '35 Lei'
    },
    {
      ro: 'Iahnie fasole',
      en: 'Bean Stew',
      ingredients: 'Fasole, morcovi, ardei, ceapă, suc de roșii, mărar, sare, piper (250g)',
      price: '15 Lei'
    },
    {
      ro: 'Mâncare de fasole verde cu pui',
      en: 'Green Bean Stew with Chicken',
      ingredients: 'Fasole verde 5kg, piept de pui 3kg, ceapă 1kg, ardei gras 0.5kg, pastă de tomate 0.5kg, sare 70g, piper 10g, usturoi 100g, mărar verde 3leg, făină 50g',
      price: '35 Lei'
    },
    {
      ro: 'Varză călită',
      en: 'Braised Cabbage',
      ingredients: 'Varză albă, sos de roșii, ardei, ceapă, roșii, sare, piper (250g)',
      price: '40 Lei'
    },
    {
      ro: 'Ciolan de porc',
      en: 'Pork Knuckle',
      ingredients: 'Ciolan de porc, sare, piper, usturoi, foi de dafin (200g)',
      price: '45 Lei'
    },
    {
      ro: 'Tăliată de vită cu sos chimichurri',
      en: 'Beef Tagliata with Chimichurri Sauce',
      ingredients: 'Antricot vită 150g, sos chimichurri 100g',
      price: '55 Lei'
    },
    {
      ro: 'Antricot vită simplu',
      en: 'Simple Beef Entrecote',
      ingredients: 'Antricot vită (200g)',
      price: '50 Lei'
    }
  ],
  'Gratar / Grill': [
    {
      ro: 'Mici',
      en: 'Romanian Meat Rolls',
      ingredients: 'Carne mici 250g, muștar 50g (70g)',
      price: '6 Lei/buc'
    },
    {
      ro: 'Ceafa de porc',
      en: 'Pork Neck',
      ingredients: 'Ceafă de porc 320g, condiment grătar 10g (200g)',
      price: '25 Lei'
    },
    {
      ro: 'Ceafa de porc Big Mama',
      en: 'Big Mama Pork Neck',
      ingredients: 'Ceafă de porc big mama, condimente grătar (350g)',
      price: '45 Lei'
    },
    {
      ro: 'Cotlet de porc',
      en: 'Pork Chop',
      ingredients: 'Cotlet de porc, condimente grătar (250g)',
      price: '25 Lei'
    },
    {
      ro: 'Cârnați proaspăți de porc',
      en: 'Fresh Pork Sausages',
      ingredients: 'Cârnați de grătar 300g (200g)',
      price: '25 Lei'
    },
    {
      ro: 'Pulpă de pui la grătar',
      en: 'Grilled Chicken Thigh',
      ingredients: 'Pulpă dezosată de pui 300g, condimente grătar 5g (200g)',
      price: '40 Lei'
    },
    {
      ro: 'Frigărui pui cu legume',
      en: 'Chicken Skewers with Vegetables',
      ingredients: 'Piept de pui 100g, roșii 30g, ciuperci 20g, ardei 20g, ceapă 20g (200g)',
      price: '25 Lei'
    },
    {
      ro: 'Pui la jar',
      en: 'Charcoal Grilled Chicken',
      ingredients: '½ pui întreg 500g, sare 5g, mămăligă 1 porție, usturoi (mujdei) 50g (600g)',
      price: '50 Lei'
    },
    {
      ro: 'Pastramă de berbecuț',
      en: 'Lamb Pastrami',
      ingredients: 'Pastramă de berbec, condimente grătar (180g)',
      price: '45 Lei'
    },
    {
      ro: 'Cotlet berbecuț',
      en: 'Lamb Chop',
      ingredients: 'Cotlet berbecuț (150g)',
      price: '45 Lei'
    },
    {
      ro: 'Coaste de porc BBQ',
      en: 'BBQ Pork Ribs',
      ingredients: 'Coaste de porc 450g, boia dulce 10g, boia iute 10g, zahăr brun 100g, piper 10g, usturoi 5g, sare 5g, miere 100g (650g)',
      price: '60 Lei'
    },
    {
      ro: 'Piept pui la grătar',
      en: 'Grilled Chicken Breast',
      ingredients: 'Piept pui la grătar (200g)',
      price: '35 Lei'
    }
  ],
  'Aperitive / Appetizers': [
    {
      ro: 'Măsline pane',
      en: 'Fried Olives',
      ingredients: 'Măsline, ouă, făină, ulei, sare (150g)',
      price: '25 Lei'
    },
    {
      ro: 'Meniu quesadilla pui',
      en: 'Chicken Quesadilla Menu',
      ingredients: 'Quesadilla (piept de pui, cheddar ras, roșii, ardei gras, lipie, boia, usturoi, sare), cartofi prăjiți, 1 sos (la alegere) (400g)',
      price: '30 Lei'
    },
    {
      ro: 'Quesadilla',
      en: 'Quesadilla',
      ingredients: 'Ardei gras 80g, roșii 60g, piept de pui 150g, cheddar ras 50g, lipie tortilla 1buc, sare 1g, usturoi 5g, boia dulce 2g',
      price: '25 Lei'
    },
    {
      ro: 'Aripioare crispy picante',
      en: 'Spicy Crispy Wings',
      ingredients: 'Aripioare de pui, ou, făină, ulei, sare (200g)',
      price: '20 Lei'
    },
    {
      ro: 'Aripioare BBQ',
      en: 'BBQ Wings',
      ingredients: 'Aripioare pui 1200g, ketchup 400ml, usturoi 10g, zahăr brun 100g, piper 5g, muștar 10g, sare 3g',
      price: '25 Lei'
    },
    {
      ro: 'Șnițel de pui',
      en: 'Chicken Schnitzel',
      ingredients: 'Piept de pui 1200g, ouă 3buc, sare 5g, piper 5g, usturoi 5g, făină 500g, mix crispy (250g)',
      price: '20 Lei'
    },
    {
      ro: 'Crispy de pui',
      en: 'Crispy Chicken',
      ingredients: 'Piept de pui 300g, ouă 1buc, pesmet 30g, sare 5g, boia dulce 5g, făină 10g (200g)',
      price: '20 Lei'
    },
    {
      ro: 'Șnițel de porc',
      en: 'Pork Schnitzel',
      ingredients: 'Cotlet de porc 1200g, ouă 3buc, sare 5g, piper 5g, usturoi 5g, făină 500g, mix crispy (250g)',
      price: '20 Lei'
    },
    {
      ro: 'Cașcaval pane',
      en: 'Fried Cheese',
      ingredients: 'Cașcaval 250g, făină 50g, ou 1buc, pesmet 80g, piper 2g, sare 1g, mix salată 50g (250g)',
      price: '20 Lei'
    },
    {
      ro: 'Fructe de mare special',
      en: 'Special Seafood',
      ingredients: 'Mix fructe de mare 1p, creveți 50g, lipie grecească 1buc, sare 2g, unt 50g, usturoi 20g, vin alb 40ml, coniac 10ml, sos napoli 80g, roșii cherry 40g',
      price: '55 Lei'
    }
  ],
  'Burgeri / Burgers': [
    {
      ro: 'Meniu Burger Lemon',
      en: 'Lemon Burger Menu',
      ingredients: 'Chiflă burger 1buc, carne de vită, parmezan, roșii, salată, ceapă, castravete murat, cheddar feliat, bacon, sosul casei, porție de cartofi prăjiți (500g)',
      price: '40 Lei'
    },
    {
      ro: 'Meniu Chicken Burger',
      en: 'Chicken Burger Menu',
      ingredients: 'Chiflă burger 1buc, salată 30g, roșii 50g, ceapă 30g, castravete fresh 40g, piept de pui 130g, pesmet 20g, făină 20g, ou 0.5 bucată, maioneză 50g, porție de cartofi prăjiți (500g)',
      price: '30 Lei'
    },
    {
      ro: 'Meniu Burger Classic',
      en: 'Classic Burger Menu',
      ingredients: 'Chiflă burger 1buc, carne burger vită 180g, roșii 30g, salată 20g, ceapă 30g, castravete murat 40g, cheddar feliat 30g, bacon 40g, sosul casei 70g, porție de cartofi prăjiți (500g)',
      price: '36 Lei'
    },
    {
      ro: 'Meniu Egg Burger',
      en: 'Egg Burger Menu',
      ingredients: 'Chiflă burger 1buc, carne burger vită 180g, roșii 30g, salată 20g, ceapă 30g, cheddar feliat 40g, bacon 30g, sosul casei 70g, ou 1 bucată, porție de cartofi prăjiți (500g)',
      price: '40 Lei'
    },
    {
      ro: 'Burger italian',
      en: 'Italian Burger',
      ingredients: 'Pălină de carne 175g (vită de Argentina), cheddar 20g, roșie 30g, ceapă roșie 20g, castravete murat 20g, bacon 20g, salată iceberg 10g, sos 30g',
      price: '38 Lei'
    }
  ],
  'Peste / Fish': [
    {
      ro: 'Creveți a Lemon',
      en: 'Lemon Shrimp',
      ingredients: 'Creveți, sos napoli, roșii cherry, unt, coniac, vin alb, lipie grecească, usturoi, mărar, sare (400g)',
      price: '55 Lei'
    },
    {
      ro: 'Creveți în sos de unt',
      en: 'Shrimp in Butter Sauce',
      ingredients: 'Creveți 250g, usturoi 20g, verdeață 3g, coniac 10ml, vin alb 20ml, lipie grecească 1buc, roșii cherry 40g, sare 10g, sos napoli 100g, unt 50g',
      price: '50 Lei'
    },
    {
      ro: 'Dorada regală',
      en: 'Royal Sea Bream',
      ingredients: 'Doradă, sare, piper (250g)',
      price: '40 Lei'
    },
    {
      ro: 'Dorada prăjită',
      en: 'Fried Sea Bream',
      ingredients: 'Dorada prăjită 200g, mămăligă 250g, mujdei 40g',
      price: '42 Lei'
    },
    {
      ro: 'Somon la grătar cu orez basmati și sos de unt',
      en: 'Grilled Salmon with Basmati Rice and Butter Sauce',
      ingredients: 'Somon, orez basmati, sos de unt, condimente grătar (300g)',
      price: '50 Lei'
    },
    {
      ro: 'Somon la grătar',
      en: 'Grilled Salmon',
      ingredients: 'Somon la grătar (200g)',
      price: '45 Lei'
    },
    {
      ro: 'Fritto misto',
      en: 'Mixed Fried Seafood',
      ingredients: 'Baby caracatița 50g, creveți 100g, scoici 50g, calamar 50g (300g)',
      price: '50 Lei'
    },
    {
      ro: 'File cod cu orez basmati',
      en: 'Cod Fillet with Basmati Rice',
      ingredients: 'Cod 150g, orez basmati 100g, sos unt 50ml',
      price: '45 Lei'
    },
    {
      ro: 'Crap prăjit',
      en: 'Fried Carp',
      ingredients: 'Crap prăjit 210g, mămăligă 250g, mujdei 40g',
      price: '35 Lei'
    },
    {
      ro: 'Saramură de crap',
      en: 'Carp Saramura',
      ingredients: 'Peste 210g, roșie 30g, ardei gras 30g, ardei iute, pătrunjel, mămăligă 250g',
      price: '38 Lei'
    },
    {
      ro: 'Saramură de dorada',
      en: 'Sea Bream Saramura',
      ingredients: 'Peste 210g, roșie 30g, ardei gras 30g, ardei iute, pătrunjel, mămăligă 250g',
      price: '45 Lei'
    }
  ],
  'Garnituri / Side Dishes': [
    {
      ro: 'Cartof copt cu unt',
      en: 'Baked Potato with Butter',
      ingredients: 'Cartof, unt, sare (150g)',
      price: '12 Lei'
    },
    {
      ro: 'Cartofi la cuptor',
      en: 'Oven Potatoes',
      ingredients: 'Cartofi 10kg, usturoi 100g, rozmarin 50g, ulei 200ml, vin alb de gătit 400ml, sare 40g, piper 20g, apă 3L',
      price: '15 Lei'
    },
    {
      ro: 'Mămăligă',
      en: 'Polenta',
      ingredients: 'Mălai, apă, unt, sare (150g)',
      price: '6 Lei'
    },
    {
      ro: 'Legume la grătar',
      en: 'Grilled Vegetables',
      ingredients: 'Ceapă, morcov, ardei, roșii (150g)',
      price: '12 Lei'
    },
    {
      ro: 'Piure de cartofi cu unt',
      en: 'Mashed Potatoes with Butter',
      ingredients: 'Cartofi proaspăți 10kg, unt 400g, lapte 1L, sare 50g (300g)',
      price: '9 Lei'
    },
    {
      ro: 'Piure de cartofi cu trufe',
      en: 'Truffle Mashed Potatoes',
      ingredients: 'Piure de cartofi cu trufe (200g)',
      price: '15 Lei'
    },
    {
      ro: 'Cartofi prăjiți',
      en: 'French Fries',
      ingredients: 'Cartofi, ulei, sare (150g)',
      price: '9 Lei'
    },
    {
      ro: 'Cartofi prăjiți cu parmezan',
      en: 'French Fries with Parmesan',
      ingredients: 'Cartofi, parmezan, usturoi, pătrunjel, ulei, sare (150g)',
      price: '9 Lei'
    },
    {
      ro: 'Orez cu legume',
      en: 'Rice with Vegetables',
      ingredients: 'Orez, ceapă, morcov, ardei, mazăre (250g)',
      price: '12 Lei'
    }
  ],
  'Sosuri / Sauces': [
    {
      ro: 'Maioneză cu usturoi',
      en: 'Garlic Mayonnaise',
      ingredients: 'Maioneză 500g, usturoi 50g, lămâie 20ml (80g)',
      price: '5 Lei'
    },
    {
      ro: 'Sos chimichurri',
      en: 'Chimichurri Sauce',
      ingredients: 'Pătrunjel 5 legături, oregano uscat 15g, usturoi 4 căței, ceapă 1buc, ulei măsline 400ml, ardei roșii 2buc, aceto balsamic 100ml, ardei iute fulgi 40g, sare 40g, zeamă de la 2 lămâi (80g)',
      price: '5 Lei'
    },
    {
      ro: 'Muștar',
      en: 'Mustard',
      ingredients: 'Muștar (80g)',
      price: '5 Lei'
    },
    {
      ro: 'Sos BBQ',
      en: 'BBQ Sauce',
      ingredients: 'Sos BBQ (80g)',
      price: '5 Lei'
    },
    {
      ro: 'Sosul casei',
      en: 'House Sauce',
      ingredients: 'Sosul casei (80g)',
      price: '5 Lei'
    },
    {
      ro: 'Sos pomodoro dulce/picant',
      en: 'Sweet/Spicy Pomodoro Sauce',
      ingredients: 'Sos pomodoro (80g)',
      price: '5 Lei'
    },
    {
      ro: 'Maioneză simplă',
      en: 'Plain Mayonnaise',
      ingredients: 'Maioneză (80g)',
      price: '5 Lei'
    },
    {
      ro: 'Maioneză picantă',
      en: 'Spicy Mayonnaise',
      ingredients: 'Maioneză 300g, ulei picant 70g (80g)',
      price: '5 Lei'
    },
    {
      ro: 'Sos Tzatziki',
      en: 'Tzatziki Sauce',
      ingredients: 'Castraveți 250g, iaurt grecesc 500g, usturoi 50g, sare 20g, piper 10g, zeamă de lămâie 10ml (90g)',
      price: '8 Lei'
    }
  ],
  'Pizza': [
    {
      ro: 'Margherita',
      en: 'Margherita',
      ingredients: 'Sos de roșii 70g, mozzarella 120g, busuioc 6 frunze, oregano 3g, ulei de măsline 5ml',
      price: '30 Lei'
    },
    {
      ro: 'Prosciutto cotto',
      en: 'Prosciutto Cotto',
      ingredients: 'Sos de roșii 70g, mozzarella 120g, prosciutto cotto 100g, oregano 3g, ulei de măsline 5ml',
      price: '35 Lei'
    },
    {
      ro: 'Prosciutto funghi',
      en: 'Prosciutto Mushroom',
      ingredients: 'Sos de roșii 70g, mozzarella 120g, prosciutto cotto 80g, ciuperci 60g, oregano 3g, ulei de măsline 5ml',
      price: '35 Lei'
    },
    {
      ro: 'Quattro stagioni',
      en: 'Four Seasons',
      ingredients: 'Sos de roșii 70g, mozzarella 120g, prosciutto cotto 60g, salam napoli 50g, ciuperci 60g, măsline kalamata 30g',
      price: '37 Lei'
    },
    {
      ro: 'Quattro formaggi',
      en: 'Four Cheese',
      ingredients: 'Mozzarella 120g, gorgonzola 50g, brie 50g, parmezan 10g',
      price: '40 Lei'
    },
    {
      ro: 'Quattro formaggi fresh',
      en: 'Fresh Four Cheese',
      ingredients: 'Mozzarella 120g, gorgonzola 50g, brie 50g, parmezan 10g, rucola 30g, roșii cherry',
      price: '40 Lei'
    },
    {
      ro: 'Diavola',
      en: 'Diavola',
      ingredients: 'Mozzarella 120g, sos de roșii 70g, salam napoli 80g, ulei picant 5ml',
      price: '35 Lei'
    },
    {
      ro: 'Sallami',
      en: 'Salami',
      ingredients: 'Sos mozzarella 70g, mozzarella 120g, salam napoli 100g, oregano 3g, ulei de măsline 5ml',
      price: '35 Lei'
    },
    {
      ro: 'Capriciosa',
      en: 'Capricciosa',
      ingredients: 'Sos mozzarella 70g, mozzarella 120g, prosciutto cotto 60g, carcioffi 60g, ciuperci 60g, măsline 30g, oregano 3g, busuioc fresh 6 frunze',
      price: '40 Lei'
    },
    {
      ro: 'Pollo e funghi',
      en: 'Chicken and Mushroom',
      ingredients: 'Sos de roșii 70g, mozzarella 120g, piept pui 100g, ciuperci 60g, parmezan 15g',
      price: '40 Lei'
    },
    {
      ro: 'Veghi',
      en: 'Vegetarian',
      ingredients: 'Sos de roșii 70g, cu/fără mozzarella 120g, ciuperci 70g, tofu 50g, măsline 30g, carcioffi 50g, roșii cherry 30g, rucola 30g',
      price: '30 Lei'
    },
    {
      ro: 'Tonno e cipolla',
      en: 'Tuna and Onion',
      ingredients: 'Sos de roșii 70g, mozzarella 120g, ton 100g, măsline 30g',
      price: '42 Lei'
    },
    {
      ro: 'Del paisano (pizza casei)',
      en: 'House Special Pizza',
      ingredients: 'Sos de roșii 70g, mozzarella 120g, ciuperci 60g, bacon 60g, salam napoli 50g, măsline 30g, ceapă 30g, jalapeños 30g',
      price: '40 Lei'
    },
    {
      ro: 'Salmone (somon)',
      en: 'Salmon Pizza',
      ingredients: 'Mozzarella 120g, sos de roșii 70g, somon 60g, ceapă 30g, măsline 30g, lămâie fresh 20ml',
      price: '35 Lei'
    }
  ],
  'Focaccia': [
    {
      ro: 'Focaccia simplă',
      en: 'Plain Focaccia',
      ingredients: 'Focaccia simplă (150g)',
      price: '8 Lei'
    },
    {
      ro: 'Focaccia usturoi',
      en: 'Garlic Focaccia',
      ingredients: 'Focaccia cu usturoi (150g)',
      price: '10 Lei'
    },
    {
      ro: 'Focaccia parmezan',
      en: 'Parmesan Focaccia',
      ingredients: 'Focaccia cu parmezan (150g)',
      price: '10 Lei'
    },
    {
      ro: 'Pâinea casei',
      en: 'House Bread',
      ingredients: 'Pâinea casei (80g)',
      price: '3 Lei'
    }
  ],
  'Deserturi / Desserts': [
    {
      ro: 'Cheese cake lemon',
      en: 'Lemon Cheese Cake',
      ingredients: 'Cheese cake cu lămâie (200g)',
      price: '20 Lei'
    },
    {
      ro: 'Desertul bucătarului',
      en: 'Chef\'s Dessert',
      ingredients: 'Desertul zilei (200g)',
      price: '20 Lei'
    },
    {
      ro: 'Înghețată',
      en: 'Ice Cream',
      ingredients: 'Vanilie/fistic/fructe de pădure (200g)',
      price: '5 Lei/cupă'
    },
    {
      ro: 'Papanași cu smântână și dulceață',
      en: 'Papanași with Sour Cream and Jam',
      ingredients: 'Papanași cu smântână și dulceață (200g)',
      price: '20 Lei'
    },
    {
      ro: 'Clătite jumătate-jumătate',
      en: 'Half-Half Pancakes',
      ingredients: 'Clătite cu două umpluturi (200g)',
      price: '20 Lei'
    },
    {
      ro: 'Lava cake cu înghețată',
      en: 'Lava Cake with Ice Cream',
      ingredients: 'Ciocolată menaj 1.2kg, unt 850g, făină 640g, zahăr 1kg, ouă 24buc, sare 5g (200g)',
      price: '25 Lei'
    }
  ],
  'Băuturi alcoolice / Alcoholic Beverages': [
    {
      ro: 'Whisky Chivas Regal 12 ani',
      en: 'Chivas Regal 12 Years Whisky',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Jameson Irish',
      en: 'Jameson Irish Whiskey',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Four Roses',
      en: 'Four Roses Bourbon',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Glenlivet 12 ani',
      en: 'Glenlivet 12 Years',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Chivas Regal Royal Salute 21 ani',
      en: 'Chivas Regal Royal Salute 21 Years',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Rom Havana Club 3 ani',
      en: 'Havana Club 3 Years Rum',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Havana Club Cuban Spiced',
      en: 'Havana Club Cuban Spiced',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Bumbu Original',
      en: 'Bumbu Original Rum',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Vodka Absolut',
      en: 'Absolut Vodka',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Ostoya Black',
      en: 'Ostoya Black Vodka',
      ingredients: '40ml',
      price: '20 Lei'
    },
    {
      ro: 'Belvedere',
      en: 'Belvedere Vodka',
      ingredients: '40ml',
      price: '25 Lei'
    },
    {
      ro: 'De Kuyper Peachtree',
      en: 'De Kuyper Peachtree',
      ingredients: '40ml',
      price: '12 Lei'
    },
    {
      ro: 'Tequila Olmeca Altos Blanco',
      en: 'Olmeca Altos Blanco Tequila',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Olmeca Altos Reposado',
      en: 'Olmeca Altos Reposado',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Tradiționale Vișinată',
      en: 'Traditional Cherry Brandy',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Afinată',
      en: 'Blueberry Brandy',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Pălincă de Prune',
      en: 'Plum Brandy',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Liquor Carolans Irish Cream',
      en: 'Carolans Irish Cream',
      ingredients: '40ml',
      price: '12 Lei'
    },
    {
      ro: 'Ramazzotti Sambuca',
      en: 'Ramazzotti Sambuca',
      ingredients: '40ml',
      price: '12 Lei'
    },
    {
      ro: 'Ramazzotti Amaro',
      en: 'Ramazzotti Amaro',
      ingredients: '40ml',
      price: '12 Lei'
    },
    {
      ro: 'Kahlua',
      en: 'Kahlua',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Malibu',
      en: 'Malibu',
      ingredients: '40ml',
      price: '12 Lei'
    },
    {
      ro: 'De Kuyper Triple Sec',
      en: 'De Kuyper Triple Sec',
      ingredients: '40ml',
      price: '12 Lei'
    },
    {
      ro: 'Gin Malfy Aranciata',
      en: 'Malfy Aranciata Gin',
      ingredients: '40ml',
      price: '20 Lei'
    },
    {
      ro: 'Malfy Rosa',
      en: 'Malfy Rosa Gin',
      ingredients: '40ml',
      price: '20 Lei'
    },
    {
      ro: 'Malfy Limone',
      en: 'Malfy Limone Gin',
      ingredients: '40ml',
      price: '20 Lei'
    },
    {
      ro: 'Malfy Original',
      en: 'Malfy Original Gin',
      ingredients: '40ml',
      price: '20 Lei'
    },
    {
      ro: 'Ceder\'s Pink Rose 0%',
      en: 'Ceder\'s Pink Rose Non-Alcoholic',
      ingredients: '40ml',
      price: '10 Lei'
    },
    {
      ro: 'Vermouth St. Petroni Blanco',
      en: 'St. Petroni Blanco Vermouth',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'St. Petroni Rojo',
      en: 'St. Petroni Rojo Vermouth',
      ingredients: '40ml',
      price: '15 Lei'
    },
    {
      ro: 'Cognac Ararat 5 Ani',
      en: 'Ararat 5 Years Cognac',
      ingredients: '40ml',
      price: '12 Lei'
    },
    {
      ro: 'Martell',
      en: 'Martell Cognac',
      ingredients: '40ml',
      price: '25 Lei'
    }
  ],
  'Cocktailuri / Cocktails': [
    {
      ro: 'Limonadă clasică',
      en: 'Classic Lemonade',
      ingredients: 'Limonadă clasică (200ml)',
      price: '15 Lei'
    },
    {
      ro: 'Limonadă cu grapefruit',
      en: 'Grapefruit Lemonade',
      ingredients: 'Limonadă cu grapefruit (200ml)',
      price: '15 Lei'
    },
    {
      ro: 'Limonadă cu portocale',
      en: 'Orange Lemonade',
      ingredients: 'Limonadă cu portocale (200ml)',
      price: '15 Lei'
    },
    {
      ro: 'Limonadă cu zmeură',
      en: 'Raspberry Lemonade',
      ingredients: 'Limonadă cu zmeură (200ml)',
      price: '15 Lei'
    },
    {
      ro: 'Hugo',
      en: 'Hugo',
      ingredients: 'Lime, mentă, prosecco, sirop de soc, apă minerală (250ml)',
      price: '8 Lei'
    },
    {
      ro: 'Cuba Libre',
      en: 'Cuba Libre',
      ingredients: 'Havana Club 3 ani, Coca Cola, lime, gheață (250ml)',
      price: '12 Lei'
    },
    {
      ro: 'Aperitivo Spritz',
      en: 'Aperitivo Spritz',
      ingredients: 'St. Petroni Aperitivo, prosecco, apă minerală (250ml)',
      price: '14 Lei'
    }
  ],
  'Vinuri / Wines': [
    {
      ro: 'Vinuri Roșii - Cuvee Uberland',
      en: 'Red Wines - Cuvee Uberland',
      ingredients: '0.75L',
      price: '200 Lei'
    },
    {
      ro: 'Recas Selene',
      en: 'Recas Selene',
      ingredients: '0.75L',
      price: '150 Lei'
    },
    {
      ro: 'Liliac Cuvee',
      en: 'Liliac Cuvee',
      ingredients: '0.75L',
      price: '120 Lei'
    },
    {
      ro: 'Caii de la Letea Vol. II Cabernet Sauvignon',
      en: 'Caii de la Letea Vol. II Cabernet Sauvignon',
      ingredients: '0.75L',
      price: '110 Lei'
    },
    {
      ro: 'Nocturne Roșu',
      en: 'Nocturne Red',
      ingredients: '0.75L',
      price: '100 Lei'
    },
    {
      ro: 'Arrogance Roșu',
      en: 'Arrogance Red',
      ingredients: '0.75L',
      price: '110 Lei'
    },
    {
      ro: 'La Plage Roșu',
      en: 'La Plage Red',
      ingredients: '0.75L',
      price: '75 Lei'
    },
    {
      ro: 'Vinuri Albe - Solo Quinta',
      en: 'White Wines - Solo Quinta',
      ingredients: '0.75L',
      price: '200 Lei'
    },
    {
      ro: 'Nocturne Alb',
      en: 'Nocturne White',
      ingredients: '0.75L',
      price: '100 Lei'
    },
    {
      ro: 'Caii de la Letea Vol. II Alb',
      en: 'Caii de la Letea Vol. II White',
      ingredients: '0.75L',
      price: '100 Lei'
    },
    {
      ro: 'Liliac Alb',
      en: 'Liliac White',
      ingredients: '0.75L',
      price: '100 Lei'
    },
    {
      ro: 'Alb de Starmina',
      en: 'Alb de Starmina',
      ingredients: '0.75L',
      price: '90 Lei'
    },
    {
      ro: 'Arrogance Alb',
      en: 'Arrogance White',
      ingredients: '0.75L',
      price: '110 Lei'
    },
    {
      ro: 'Recas Sole',
      en: 'Recas Sole',
      ingredients: '0.75L',
      price: '110 Lei'
    },
    {
      ro: 'Pinot Gris',
      en: 'Pinot Gris',
      ingredients: '0.75L',
      price: '100 Lei'
    },
    {
      ro: 'La Plage Alb',
      en: 'La Plage White',
      ingredients: '0.75L',
      price: '75 Lei'
    },
    {
      ro: 'Vinuri Roze - Solo Quinta Roze',
      en: 'Rosé Wines - Solo Quinta Rosé',
      ingredients: '0.75L',
      price: '200 Lei'
    },
    {
      ro: 'Roza de Samburesti',
      en: 'Roza de Samburesti',
      ingredients: '0.75L',
      price: '90 Lei'
    },
    {
      ro: 'Rozalia',
      en: 'Rozalia',
      ingredients: '0.75L',
      price: '90 Lei'
    },
    {
      ro: 'Arrogance Roze',
      en: 'Arrogance Rosé',
      ingredients: '0.75L',
      price: '110 Lei'
    },
    {
      ro: 'Rasova Sur Mer',
      en: 'Rasova Sur Mer',
      ingredients: '0.75L',
      price: '100 Lei'
    },
    {
      ro: 'Nocturne Roze',
      en: 'Nocturne Rosé',
      ingredients: '0.75L',
      price: '200 Lei'
    },
    {
      ro: 'Caii de la Letea Volumul II Roze',
      en: 'Caii de la Letea Volume II Rosé',
      ingredients: '0.75L',
      price: '110 Lei'
    },
    {
      ro: 'Prince Laurent',
      en: 'Prince Laurent',
      ingredients: '0.75L',
      price: '250 Lei'
    },
    {
      ro: 'Cuvee de Purcari Alb',
      en: 'Cuvee de Purcari White',
      ingredients: '0.75L',
      price: '250 Lei'
    },
    {
      ro: 'Cuvee de Purcari Roze',
      en: 'Cuvee de Purcari Rosé',
      ingredients: '0.75L',
      price: '250 Lei'
    },
    {
      ro: 'Prosecco Visconti della Roccia',
      en: 'Prosecco Visconti della Roccia',
      ingredients: '0.75L',
      price: '90 Lei'
    }
  ],
  'Bere / Beer': [
    {
      ro: 'Staropramen',
      en: 'Staropramen',
      ingredients: '330ml',
      price: '10 Lei'
    },
    {
      ro: 'Stella Artois',
      en: 'Stella Artois',
      ingredients: '330ml',
      price: '12 Lei'
    },
    {
      ro: 'Stella Artois N/A',
      en: 'Stella Artois Non-Alcoholic',
      ingredients: '330ml',
      price: '14 Lei'
    },
    {
      ro: 'Madri',
      en: 'Madri',
      ingredients: '330ml',
      price: '12 Lei'
    },
    {
      ro: 'Corona',
      en: 'Corona',
      ingredients: '330ml',
      price: '20 Lei'
    },
    {
      ro: 'Miller',
      en: 'Miller',
      ingredients: '330ml',
      price: '13 Lei'
    }
  ],
  'Băuturi răcoritoare / Soft Drinks': [
    {
      ro: '7-Up',
      en: '7-Up',
      ingredients: '0.25L',
      price: '8 Lei'
    },
    {
      ro: 'Everess',
      en: 'Everess',
      ingredients: '0.25L',
      price: '8 Lei'
    },
    {
      ro: 'Cappy Pulpy de Portocale',
      en: 'Cappy Pulpy Orange',
      ingredients: '0.25L',
      price: '10 Lei'
    },
    {
      ro: 'Cappy Pulpy de Piersică',
      en: 'Cappy Pulpy Peach',
      ingredients: '0.25L',
      price: '10 Lei'
    },
    {
      ro: 'Mirinda',
      en: 'Mirinda',
      ingredients: '0.25L',
      price: '8 Lei'
    },
    {
      ro: 'Pepsi',
      en: 'Pepsi',
      ingredients: '0.25L / 0.50L',
      price: '8 Lei / 12 Lei'
    },
    {
      ro: 'Pepsi Max',
      en: 'Pepsi Max',
      ingredients: '0.50L',
      price: '12 Lei'
    },
    {
      ro: 'Bucovina Apă Plată',
      en: 'Bucovina Still Water',
      ingredients: '0.33L / 0.70L',
      price: '7 Lei / 11 Lei'
    },
    {
      ro: 'Bucovina Apă Minerală',
      en: 'Bucovina Mineral Water',
      ingredients: '0.33L / 0.70L',
      price: '7 Lei / 11 Lei'
    }
  ],
  'Cafea / Coffee': [
    {
      ro: 'Espresso',
      en: 'Espresso',
      ingredients: '40ml',
      price: '8 Lei'
    },
    {
      ro: 'Espresso Doppio',
      en: 'Double Espresso',
      ingredients: '80ml',
      price: '12 Lei'
    },
    {
      ro: 'Cappuccino',
      en: 'Cappuccino',
      ingredients: '190ml',
      price: '14 Lei'
    },
    {
      ro: 'Caffe Latte',
      en: 'Caffe Latte',
      ingredients: '190ml',
      price: '14 Lei'
    },
    {
      ro: 'Americano',
      en: 'Americano',
      ingredients: '120ml',
      price: '13 Lei'
    },
    {
      ro: 'Americano cu Lapte',
      en: 'Americano with Milk',
      ingredients: '140ml',
      price: '14 Lei'
    }
  ],
  'Ceai / Tea': [
    {
      ro: 'Ceai Julius Meinl cu Mentă',
      en: 'Julius Meinl Mint Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Cirese și Rodie',
      en: 'Cherry and Pomegranate Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Simfonia Fructelor',
      en: 'Fruit Symphony Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Esență de Plante Alpine',
      en: 'Alpine Herbs Essence Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Green Jasmine Chung Hao',
      en: 'Green Jasmine Chung Hao Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Ceai Julius Meinl Camomilă',
      en: 'Julius Meinl Chamomile Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Strudel cu Mere',
      en: 'Apple Strudel Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Ghimbir cu Iarbă de Lămâie',
      en: 'Ginger with Lemongrass Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Ceai Julius Meinl Gray Blossom',
      en: 'Julius Meinl Gray Blossom Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Căpșuni cu Mentă',
      en: 'Strawberry with Mint Tea',
      ingredients: '200ml',
      price: '15 Lei'
    },
    {
      ro: 'Chun Mee Organic',
      en: 'Chun Mee Organic Tea',
      ingredients: '200ml',
      price: '15 Lei'
    }
  ]
};

const MenuItem = ({ item, index }: { item: { ro: string; en: string; ingredients: string; price: string }; index: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: '-50vw' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '50vw' }}
      transition={{ duration: 0.2, delay: index * 0.02 }}
      className="menu-card p-2 rounded-lg mb-2 transform w-full"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative overflow-hidden rounded-lg bg-white bg-opacity-95 p-3 w-full text-left transition-all hover:bg-opacity-100 hover:shadow-md"
      >
        <div className="flex justify-between items-start">
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-base font-semibold text-gray-800 leading-tight pr-2">{item.ro}</h3>
              {item.price && (
                <span className="text-base font-bold text-yellow-600 flex-shrink-0">{item.price}</span>
              )}
            </div>
            <p className="text-xs text-gray-600 italic leading-tight">{item.en}</p>
          </div>
          {item.ingredients && (
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-yellow-500 ml-2 flex-shrink-0"
            >
              <ChevronDown size={16} />
            </motion.div>
          )}
        </div>
        
        <AnimatePresence>
          {isOpen && item.ingredients && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="pt-2 mt-2 border-t border-gray-100">
                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.ingredients}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="h-0.5 w-8 bg-yellow-400 rounded-full mt-2" />
      </button>
    </motion.div>
  );
};

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState(Object.keys(menuCategories)[0]);
  
  // Set default view mode based on screen size
  const getDefaultViewMode = (): 'grid' | 'list' => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 640 ? 'list' : 'grid'; // 640px is Tailwind's sm breakpoint
    }
    return 'grid';
  };
  
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(getDefaultViewMode);
  const [openCategories, setOpenCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (category: string) => {
    const newOpenCategories = new Set(openCategories);
    if (newOpenCategories.has(category)) {
      newOpenCategories.delete(category);
    } else {
      newOpenCategories.add(category);
    }
    setOpenCategories(newOpenCategories);
  };

  return (
    <div className="min-h-screen pt-16 px-2 pb-16 sm:px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 mb-2 sm:mb-4">Meniul Nostru</h1>
          <p className="text-lg sm:text-xl text-gray-600 font-serif italic px-4">Dacă papilele tale gustative ar putea dansa, aici ar face-o</p>
        </motion.div>
        
        {/* Mobile-optimized category selector */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Categorii</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-yellow-400 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
          
          {/* Grid view for categories */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {Object.keys(menuCategories).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 text-left ${
                    selectedCategory === category
                      ? 'bg-yellow-400 text-white shadow-lg scale-105'
                      : 'bg-white text-gray-700 hover:bg-yellow-50 shadow-sm hover:shadow-md'
                  }`}
                >
                  <div className="line-clamp-2">
                    {category}
                  </div>
                  <div className="text-xs opacity-75 mt-1">
                    {menuCategories[category as keyof typeof menuCategories].length} items
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* List view for categories */
            <div className="space-y-2">
              {Object.keys(menuCategories).map((category) => (
                <div
                  key={category}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleCategory(category)}
                    className="w-full p-3 text-sm font-medium transition-all duration-200 text-left flex justify-between items-center bg-white text-gray-700 hover:bg-yellow-50"
                  >
                    <span>{category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs opacity-75">
                        {menuCategories[category as keyof typeof menuCategories].length}
                      </span>
                      <motion.div
                        animate={{ rotate: openCategories.has(category) ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-yellow-500"
                      >
                        <ChevronDown size={16} />
                      </motion.div>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {openCategories.has(category) && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden bg-gray-50"
                      >
                        <div className="p-2 space-y-1">
                          {menuCategories[category as keyof typeof menuCategories].map((item, index) => (
                            <MenuItem 
                              key={item.ro} 
                              item={item} 
                              index={index}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Menu items - Only show in grid mode */}
        {viewMode === 'grid' && (
          <div className="relative">
            <div className="mb-4 p-3 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <h3 className="font-semibold text-gray-800 mb-1">{selectedCategory}</h3>
              <p className="text-sm text-gray-600">
                {menuCategories[selectedCategory as keyof typeof menuCategories].length} preparate disponibile
              </p>
            </div>
            
            <AnimatePresence mode="wait">
              <motion.div 
                key={selectedCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3"
              >
                {menuCategories[selectedCategory as keyof typeof menuCategories].map((item, index) => (
                  <MenuItem 
                    key={item.ro} 
                    item={item} 
                    index={index}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
      
      {/* Bottom fade effect */}
      <div className="fixed bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none -z-10" />
    </div>
  );
}

export default Menu;