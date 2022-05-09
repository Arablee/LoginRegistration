const userRole = Object.freeze({
    ADMIN: 'ADMIN',
    USER: 'USER',
    MODERATOR: 'MODERATOR',
});

const userType = Object.freeze({
    PUBLIC: 'PUBLIC',
    LOCAL: 'LOCAL',
    SOCIAL: 'SOCIAL',
});

const provider = Object.freeze({
    LOCAL: 'LOCAL',
    GOOGLE: 'GOOGLE',
    FACEBOOK: 'FACEBOOK',
    LINKEDIN:'LINKEDIN'
});

const Currency = Object.freeze({
    AZN: 'AZN',
    EUR: 'EUR',
    USD: 'USD',
});

const Gender = Object.freeze({
    MALE: 'MALE',
    FEMALE: 'FEMALE',
    UNKNOWN: 'UNKNOWN',
});



const MainCategory = Object.freeze({
    SoyuqRollar: "Soyuq Rollar",
    IstiRollar: "İsti Rollar",
    Erishte:"Əriştə",
    Teppanyaki:"Teppanyaki",
    FriedRice:"Fried Rice",
    BalikEkmek:"Balık ekmek",
    Setler:"Setlər",
    KomboSetler:"Kombo Setlər",
    Ichkiler:"İçkilər"
});

const SoyuqRollar=Object.freeze({
    California:'California (8)',
    Philadelphia:'Philadelphia (8)',
    PhiladelphiaShrimp:'Philadelphia Shrimp (8)',
    GrilledPhiladelphia:'Grilled Philadelphia (8)',
    Tauniki:'Tanuki (8)',
    PhiladelphiaMozarella:'Philadelphia Mozarella (8)',
    CheeseRoll:'Cheese roll (8)',
    ChickenRoll:'Chicken roll (8)',
    Bonita:'Bonita (8)',
    AlyaskaFresh:'Alyaska Fresh (8)',
    Fukinizhe:'Fukinizhe (8)',
    ZapconCalifornia:'Zapcon California (8)',
    ZapconKrab:'Zapcon Krab (8)',
    ZapconSalmon:'Zapcon Salmon (8)',
    Spicy:'Spicy (8)',
    ShrimpNigiri:'Shrimp Nigiri (2)',
    SalmonNigiri:'Salmon Nigiri (2)',
    ChickenMaki:'Chicken Maki (8)',
    SakeMaki:'Sake Maki (8)',
    Alyaska:'Alyaska (8)',
    AlfaRoll:'Alfa Roll (8)',
    CrabMaki:'Crab Maki (8)',
});

const IstiRollar=Object.freeze({
    HotCrab:'Hot Crab (8)',
    HotCheese:'Hot Cheese (10)',
    HotChicken:'Hot Chicken (10)',
    HotSalmon:'Hot Salmon (10)'
});

const Setler=Object.freeze({
    MiniSet:'Mini Set (26)',
    TexasHotSet:'Texas Hot Set (30)',
    DoubleSet:'Double Set (32)',
    ArizonaSet:'Arizona Set (36)',
    NevadaSet:'Nevana Set (26)',
    MontanaSet:'Montana Set (46)',
    CarolinaSet:'Carolina Set (60)',
    GoldSet:'Gold Set (52)',
    NebraskaSet:'Nebraska Set (54)',
    OregonSet:'Oregon Set (62)',
    FloridaSet:'Florida Set (62)',
    MinnesotaSet:'Minnesota Set (62)',
    IndianaSet:'Indiana Set (70)',
    Omega:'Omega 3 Set (32)'
});

const KomboSetler=Object.freeze({
    GreenSetKombo:'Green Set Kombo (34)',
    DokataKombo:'Dokata Kombo (34)',
    MichiganKombo:'Michigan Kombo (70)'
})


module.exports={
    userRole,
    Gender,
    MainCategory,
    IstiRollar,
    SoyuqRollar,
    Setler,
    KomboSetler,
    userType,
    provider
}