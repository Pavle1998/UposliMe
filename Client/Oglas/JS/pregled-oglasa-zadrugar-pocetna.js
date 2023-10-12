import { Oglas } from "./Oglas.js";
import { Zadruga } from "../../Zadruga/JS/Zadruga.js";
import { Zadrugar } from "../../Zadrugar/JS/Zadrugar.js";

const urlString = window.location.search; //uzmi url
const urlParam=new URLSearchParams(urlString); //preuzmi parametre
var username = urlParam.get('username'); //odredjeni parametar  
var oglasId=urlParam.get('oglas');//preuzmi oglas id iz url

//povuci podatke iz baze o zadrugaru ciji je username prosledjen kroz url
let zadrugar;
let promZadrugar = await fetch(`http://localhost:5258/Zadrugar/ValidanUsername/${username}`);
await promZadrugar.json().then(z=>{
        zadrugar = new Zadrugar(z.id, z.userName, z.password, z.ime, z.prezime, z.slika, z.email, z.telefon,
            z.datumRodjenja, z.jmbg, z.srednjaSkola, z.fakultet, z.indeks, z.lbo, z.brojRacuna, 
            z.grad, z.ulica, z.brojStana, z.brojUlaza, z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);
})

//ucitavanje oglasa
let prosledjenOglas; 
let promOglas = await fetch(`http://localhost:5258/Oglas/PreuzmiOglas/${oglasId}`);
await promOglas.json().then(oglas=>{
    prosledjenOglas = new Oglas(oglas.id, oglas.naziv, oglas.opis, oglas.brojPotrebnihRadnika, oglas.grad, oglas.ulica, oglas.brojStana, oglas.brojUlaza,
                            oglas.rokZaPrijavu, oglas.datumPostavljanja, oglas.datumIzvrsavanjaPosla, oglas.tip, oglas.novac, oglas.nacinPlacanja,
                            oglas.odobren, oglas.odabraniRadnici, oglas.napravljenUgovor,  oglas.aktuelan, oglas.oglasiZadrugari, oglas.zadruga, oglas.poslodavac);
        }).catch(s=>console.log("Greska kod preuzimanja oglasa: ", s));


var glavno = document.querySelector(".glavni");

    let forma = document.createElement("div");
    forma.className="Forma";
    glavno.appendChild(forma);

    let forma2 = document.createElement("div");
    forma2.className="Forma2";
    forma.appendChild(forma2);

//Naslov div
    let Naslov = document.createElement("div");
    Naslov.className="Naslov";
    forma2.appendChild(Naslov);
    Naslov.innerHTML=prosledjenOglas.naziv;

//div koji sadrzi div za leve i desne labele
    let forma3 = document.createElement("div");
    forma3.className="Forma3";
    forma2.appendChild(forma3);

//div za labelu Opis i za sadrzaj opisa
    let Opis = document.createElement("div");
    Opis.className="Opis";
    forma2.appendChild(Opis);

    let opis = document.createElement("label");
    opis.className="LabeleGore";
    opis.innerHTML="Opis";
    Opis.appendChild(opis);

    let SadrzajOpisa = document.createElement("label");
    SadrzajOpisa.className="LabeleDole";
    SadrzajOpisa.innerHTML=prosledjenOglas.opis;
    Opis.appendChild(SadrzajOpisa);

//div za leve labele
    let LeviDiv = document.createElement("div");
    LeviDiv.className="Levo";
    forma3.appendChild(LeviDiv);


//div za oda bir zadrugara
    let divZadrugari = document.createElement("div");
    divZadrugari.className="divZadrugari";
    forma2.appendChild(divZadrugari);

//div za desne labele
    let DesniDiv = document.createElement("div");
    DesniDiv.className="Desno";
    forma3.appendChild(DesniDiv);

    let divDugme = document.createElement("div");
    divDugme.className="divDugme";
    forma2.appendChild(divDugme);

    let obrisiBtn = document.createElement("button");
    obrisiBtn.className="Dugme obrisiBtn";
    obrisiBtn.innerHTML="Obriši oglas";
    divDugme.appendChild(obrisiBtn);

    // aplicirajBtn
    let izmeniBtn = document.createElement("button");
    izmeniBtn.className="Dugme izmeniBtn";
    izmeniBtn.innerHTML="Apliciraj";
    divDugme.appendChild(izmeniBtn);


    let LabeleLevo = ["Zadruga", "Poslodavac", "Adresa", "Tip", "Način plaćanja"];
    let SadrzajLevo = [ prosledjenOglas.zadruga.naziv,prosledjenOglas.poslodavac.naziv , prosledjenOglas.grad+" "+prosledjenOglas.ulica+" "+prosledjenOglas.brojStana+" "+prosledjenOglas.brojUlaza, prosledjenOglas.tip, prosledjenOglas.nacinPlacanja];
    
    let datIzvPosl=new Date(prosledjenOglas.datumIzvrsavanjaPosla);
    let datIzvPoslIVreme=datIzvPosl.getDay()+"."+(datIzvPosl.getMonth()+1)+"."+datIzvPosl.getFullYear()+"." + "   "+datIzvPosl.getHours()+":"+datIzvPosl.getMinutes();

    let datPos=new Date(prosledjenOglas.datumPostavljanja);
    let datPosIVreme=datPos.getDay()+"."+(datPos.getMonth()+1)+"."+datPos.getFullYear()+"." + "   "+datPos.getHours()+":"+datPos.getMinutes();

    let rokZaPr=new Date(prosledjenOglas.rokZaPrijavu);
    let rokZaPrIVreme=rokZaPr.getDay()+"."+(rokZaPr.getMonth()+1)+"."+rokZaPr.getFullYear()+"." + "   "+rokZaPr.getHours()+":"+rokZaPr.getMinutes();

    let LabeleDesno = ["Rok za prijavu", "Datum izvršavanja", "Datum postavljanja", "Broj potrebnih radnika", "Novac"];
    let SadrzajDesno = [rokZaPrIVreme, datIzvPoslIVreme, datPosIVreme, prosledjenOglas.brojPotrebnihRadnika, prosledjenOglas.novac+".00 dinara"];

    
    /*//let zadrugari=[];
    prosledjenOglas.oglasiZadrugari.forEach(z => {
        let zad=new Zadrugar(z.zadrugar.id, z.zadrugar.userName, z.zadrugar.password, z.zadrugar.ime, z.zadrugar.prezime, z.zadrugar.slika, z.zadrugar.email, z.zadrugar.telefon,
            z.zadrugar.datumRodjenja, z.zadrugar.jmbg, z.zadrugar.srednjaSkola, z.zadrugar.fakultet, z.zadrugar.indeks, z.zadrugar.lbo, z.zadrugar.brojRacuna, 
            z.zadrugar.grad, z.zadrugar.ulica, z.zadrugar.brojStana, z.zadrugar.brojUlaza, z.zadrugar.feedbacks, z.zadrugar.oglasi, z.zadrugar.ugovori, z.zadrugar.notifikacije);
        //zadrugari.push(zad);
        zad.crtajZadrugara(divZadrugari);
    });*/

    for (let i=0; i<LabeleLevo.length; i++)
    {
        let l = document.createElement("label");
        l.className="LabeleGore"
        LeviDiv.appendChild(l);
        l.innerHTML=LabeleLevo[i];

        let p = document.createElement("label");
        p.className="LabeleDole";
        LeviDiv.appendChild(p);
        p.innerHTML=SadrzajLevo[i];
        
        //dodamo klasu i id da bi mogli da otvorimo profil 
        if(i==0)
        {
            p.classList.add('zadruga');
            p.id=prosledjenOglas.zadruga.userName;
        }

        //dodamo klasu i id da bi mogli da otvorimo profil 
        if(i==1){
            p.classList.add('poslodavac');
            p.id=prosledjenOglas.poslodavac.userName;
        }
    }

    for (let i=0; i<LabeleDesno.length; i++)
    {
        let l = document.createElement("label");
        l.className="LabeleGore"
        DesniDiv.appendChild(l);
        l.innerHTML=LabeleDesno[i];

        let p = document.createElement("label");
        p.className="LabeleDole";
        DesniDiv.appendChild(p);
        p.innerHTML=SadrzajDesno[i];
    }

//funkcija za dugme apliciraj
izmeniBtn.addEventListener("click", function () {
    fetch(`http://localhost:5258/Zadrugar/Apliciranje/${prosledjenOglas.id}/${zadrugar.id}`,
    {
        method: "POST"
    }).then(p=>
        {
            location.href=`./index.html?username=${username}`;
        });
})

// //funkcija za dugme obrisi
// obrisiBtn.addEventListener("click",function(){
//     console.log("dddd");
// });


let poslodavacBtn=document.querySelector(".poslodavac");
poslodavacBtn.addEventListener("click",function(){  
    location.href="../../Zadrugar/korisnikZadrugar/zadrugar-prikaz-korisnika.html?username="+username+"&poslodavac="+poslodavacBtn.id;
})

let zadrugaBtn=document.querySelector(".zadruga");
zadrugaBtn.addEventListener("click",function(){  
    location.href="../../Zadrugar/korisnikZadrugar/zadrugar-prikaz-korisnika.html?username="+username+"&zadruga="+zadrugaBtn.id;
})
