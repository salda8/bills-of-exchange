# Směnky

Vaším úkolem je dokončit každou z částí.

[API](Api) - část zaměřená na .NET\
[Klient](Client) - část zaměřená na práci s webovým prohlížečem a JavaScriptem

Jednotlivé problémy můžete řešit na libovolných úrovních aplikace (tam kde uznáte za vhodné). Důležité je, aby řešení bylo funkční, či aby jeho některá část byla funkční. Můžete vyřešit čistě API nebo Klientskou část (**chcete-li řešit pouze klientskou část bez komunikace s API serverem, použijte vlastní placeholder data**).

Každá část obsahuje seznam bonusových úkolů, které nemusíte splnit.

Pro vaše řešení si vytvořte vlastní větev se jménem ve formátu "datum pohovoru"/"vaše jméno" (pro pushování větví je nutné být kolaborátorem na repozitáři, po kontaktu s HR obdržíte na e-mail pozvánku).

Pokud ještě nejste v kontaktu s HR a i tak chcete úlohu vypracovat, udělejte si na GitHubu fork repozitáře a řešení submitněte pull requestem.

V případě jakýkolich otázek, či problémů: lukas.prochazka3@cts-tradeit.cz

## Slovníček

Diagram entit a jejich vztahů se nachází v části [API](Api)

Protože je úloha stylizována do tématiky cenných papírů, dávám slovníček některých pojmů které se zde používají:

### Směnka (an. Bill of Exchange)

Cenný papír kterým se vystavující zavazuje splnit dluh na směnce uveděný, je-li mu směnka předložena.

Např.: "Vystavil-li Petr směnku na 500 Kč Davidovi. Nyní může David vrátit směnku Petrovi a žádat daný finanční obnos."

### Rubopis neboli Indosament (an. Endorsement)

Poznámka napsaná na rubu směnky, kterou lze směnku převést na dalšího. Nový vlastník směnky poté může směnku vyměnit s výstavcem směnky za nějaké plnění. Tedy poznámka na rub směnky je nutná aby předání bylo platné.

Např. "Chce-li David předat Martinovi směnku od Petra, napíše na její rub, že ji předává Martinovi. Martin pak může po Petrovi po předložení žádat oněch 500 Kč."

### Řad

Rubopisy společně tvoří řad, tedy nějaké pořadí osob skrze něž směnka putovala. Ten kdo je v řadu první, je jejím vlastníkem a může směnku předložit výstavci. Rubopisy v řadu fungují jako **linked list**. Aby byl první v řadu skutečný vlastník směnky, musí být všechny rubopisy společně vytvořit konzistentní seznam až k prvnímu vlastníku směnky.

Např. "Chce-li Martin předat směnku Janovi. Poznamená opět předání na rub směnky. Nyní řad směnky vypadá David->Martin->Jan".

Pokud by se směnku na dalšího snažil předat někdo, kdo není v řadu první, bude předání neplatné.
