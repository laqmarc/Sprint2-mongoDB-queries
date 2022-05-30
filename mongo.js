/*1-Escriu una consulta per mostrar tots els documents en la col·lecció Restaurants*/
db.restaurants.find().pretty();
/*2-Escriu una consulta per mostrar el restaurant_id, name, borough i cuisine de tots els documents en la col·lecció Restaurants*/
db.restaurants.find({}, {restaurant_id: true, name: true, borough: true, cuisine: true}).pretty();
/*3-Escriu una consulta per mostrar el restaurant_id, name, borough i cuisine, però excloent el camp _id per tots els documents en la col·lecció Restaurants*/
db.restaurants.find({}, {_id: false, restaurant_id: true, name: true, borough: true, cuisine: true}).pretty();
/*4-Escriu una consulta per mostrar restaurant_id, name, borough i zip code, però excloent el camp _id per tots els documents en la col·lecció Restaurants*/
db.restaurants.find({}, {_id: false, restaurant_id: true, name: true, borough: true, address: {zipcode: true}}).pretty();
/*5-Escriu una consulta per mostrar tots els restaurants que estan en el Bronx*/
db.restaurants.find({borough: "Bronx"}).pretty();
/*6-Escriu una consulta per mostrar els primers 5 restaurants que estan en el Bronx*/
db.restaurants.find({borough: "Bronx"}).limit(5).pretty();
/*7-Escriu una consulta per mostrar els 5 restaurants després de saltar els primers 5 que que siguin del Bronx*/
db.restaurants.find({borough: "Bronx"}).limit(5).skip(5).pretty();
/*8-Escriu una consulta per trobar els restaurants que tenen algun score més gran de 90*/
db.restaurants.find({"grades.scrore": {$gt: 90}});
/*9-Escriu una consulta per trobar els restaurants que tenen un score més gran que 80 però menys que 100*/
db.restaurants.find({"grades.score": {$gt: 80, $lt: 100}}).pretty();
/*10-Escriu una consulta per trobar els restaurants que estan situats en termes de longitud inferiors a -95.754168*/
db.restaurants.find({"address.coord.0": {$lt: -95.754168}}).pretty();
/*11-Escriu una consulta de MongoDB per a trobar els restaurants que no cuinen  menjar 'American' i tenen algun score superior a 70 i latitud inferior a -65.754168*/
db.restaurants.find({cuisine: {$ne: "American "}, "grades.score": {$gt: 70}, "address.coord.0": {$lt: -65.754168}}).pretty();
/*12-Escriu una consulta per trobar els restaurants que no preparen menjar 'American' i tenen algun score superior a 70 i que, a més,  és localitzen en longituds inferiors a -65.754168. Nota : Fes aquesta consulta sense utilitzar operador $and */
db.restaurants.find({cuisine: {$ne: "American "}, "grades.score": {$gt: 70}, "address.coord.0": {$lt: -65.754168}}).pretty();
/*13-Escriu una consulta per trobar els restaurants que no preparen menjar  'American ', tenen alguna nota 'A' i no pertanyen a Brooklyn. S'ha de mostrar el document segons la cuisine en ordre descendent*/
db.restaurants.find({cuisine: {$ne: "American"}, "grades.grade": {$eq: 'A'}, "borough": {$ne: 'Brooklyn'}}).sort({cuisine: -1}).pretty();
/*14-Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que contenen 'Wil' en les tres primeres lletres en el seu nom*/
db.restaurants.find({name: /^will/}, {_id: false, restaurant_id: true, name: true, borough: true, cuisine: true}).pretty();
/*15-Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que contenen 'ces' en les últimes tres lletres en el seu nom*/
db.restaurants.find({name: /ces^/}, {_id: false, restaurant_id: true, name: true, borough: true, cuisine: true}).pretty();
/*16-Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que contenen 'Reg' en qualsevol lloc del seu nom*/
db.restaurants.find({name: {$regex: "Reg"}}, {_id: false, restaurant_id: true, name: true, borough: true, cuisine: true}).pretty();
/*17-Escriu una consulta per trobar els restaurants que pertanyen al Bronx i preparen plats americans o xinesos*/
db.restaurants.find({borough: "Bronx", $or: [{cuisine: {$regex: "American"}}, {cuisine: "Chinese"}]}).pretty();
/*18-Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per aquells restaurants que pertanyen a Staten Island, Queens, Bronx o Brooklyn*/
db.restaurants.find({$or: [{borough: "Staten Island"}, {borough: "Queens"}, {borough: "Bronx"}, {borough: "Brooklyn"}]}, {_id: false, restaurant_id: true, name: true, borough: true, cuisine: true});
/*19-Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que NO pertanyen a Staten Island, Queens, Bronx o Brooklyn*/
db.restaurants.find({$nor: [{borough: "Staten Island"}, {borough: "Queens"}, {borough: "Bronx"}, {borough: "Brooklyn"}]}, {_id: false, restaurant_id: true, name: true, borough: true, cuisine: true}).pretty();
/*20-Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que aconsegueixin una nota menor que 10*/
db.restaurants.find({"grades.score":{$lte: 10}},{_id: false, restaurant_id: true, name: true, borough: true, cuisine: true});
/*21-Escriu una consulta per trobar el restaurant_id, name, borough i cuisine per a aquells restaurants que preparen marisc ('seafood') excepte si son 'American', 'Chinese' o el name del restaurant comença amb lletres 'Wil'*/
db.restaurants.find({$and: [{cuisine: { $ne: "American" }}, {cuisine: { $ne: "Chinese" }}, {$or:[{name:  /fish/i},{name: /^Wil/i}]} ] }, {restaurant_id: true, name: true, borough: true, cuisine: true });
/*22-Escriu una consulta per trobar el restaurant_id, name i grades per a aquells restaurants que aconsegueixin un grade de "A" i un score de 11 amb un ISODate "2014-08-11T00:00:00Z"*/
db.restaurants.find({grades: {$elemMatch: {score: 11, date: ISODate("2014-08-11T00:00:00Z")} }, "grades.grade": "A" }, { restaurant_id: true, name: true, grades: true });
/*23-Escriu una consulta per trobar el restaurant_id, name i grades per a aquells restaurants on el 2n element de l'array de graus conté un grade de "A" i un score 9 amb un ISODate "2014-08-11T00:00:00Z"*/
db.restaurants.find({"grades.1.score": 9, "grades.1.date": ISODate("2014-08-11T00:00:00Z"), "grades.1.grade": "A" }, { restaurant_id: true, name: true, grades: true });
/*24-Escriu una consulta per trobar el restaurant_id, name, adreça i ubicació geogràfica per a aquells restaurants on el segon element del array coord conté un valor entre 42 i 52*/
db.restaurants.find({$and:[{"address.coord.1":{$gt:42}}, {"address.coord.1":{$lte:52}}]}, {_id:false, restaurant_id: true, name: true, address: true });
/*25-Escriu una consulta per organitzar el nom dels restaurants en ordre ascendent juntament amb totes les columnes*/
db.restaurants.find().sort({name: 1});
/*26-Escriu una consulta per organitzar el nom dels restaurants en ordre descendent juntament amb totes les columnes*/
db.restaurants.find().sort({name: -1});
/*27-Escriu una consulta per organitzar el nom de la cuisine en ordre ascendent i el barri en ordre descendent*/
db.restaurants.find().sort({cuisine: 1, borough: -1});
/*28-Escriu una consulta per saber si les direccions contenen el carrer*/
db.restaurants.find({"address.street": null });
/*29-Escriu una consulta que seleccioni tots el documents en la col·lecció de restaurants on els valors del camp coord és de tipus Double*/ç
db.restaurants.find({"address.coord": { $type: "double" }});
/*30-Escriu una consulta que seleccioni el restaurant_id, name i grade per a aquells restaurants que retornen 0 com a residu després de dividir algun dels seus score per 7*/
db.restaurants.find({"grades.0.score": {$mod: [7, 0] }}, { restaurant_id: true, name: true, grades: true });
/*31-Escriu una consulta per trobar el name de restaurant, borough, longitud, latitud i cuisine per a aquells restaurants que contenen 'mon' en algun lloc del seu name*/
db.restaurants.find({name: /mon/i }, {name: true, borough: true, "address.coord": true, cuisine: true});
/*32-Escriu una consulta per trobar el name de restaurant, borough, longitud, latitud i cuisine per a aquells restaurants que conteinen 'Mad' com a primeres tres lletres del seu name*/
db.restaurants.find({name:  /^Mad/i  }, {name: true, borough: true, "address.coord": true, cuisine: true});


