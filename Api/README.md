# Směnky API

Nachází se zde 4 projekty:

- BillsOfExchange - webová aplikace
- BillsOfExchange.Tests - prázdný projekt pro unit testy
- BillsOfExchange.DataProvider - projekt obsahující rozhraní a třídy pro načítání dat
- BillsOfExchange.DataProvider.Test - projekt s interními testy (neupravovat -> není součástí úkolu)

Můžete přidat libovolný počet dalších projektů. Neupravujte pouze DataProvider a jeho obsah. Typy z DataProvideru můžete rozšiřovat skrze dědičnost.

## BillsOfExchange.DataProvider

### Model

Tato sekce obsahuje vysvětlení datových tříd a některých členů

- Party - reprezentuje nějakou osobu (může být buď tím kdo směnku vystavil, nebo ten v jehož prospěch byla vystavena)
- BillOfExchange - reprezentuje směnku
  - DrawerId - osoba, jež směnku vystavila
  - BeneficiaryId - osoba, v jejíchž prospěch byla směnka vystavena
- Endosament - reprezentuje rubopis/indosament, respektive zápis v něm, což je dodatečná informace skrze kterou může ten, v jehož prospěch je směnka vystavena, tuto směnku předat další osobě
  - BillId - směnka k níž se rubopis váže
  - NewBeneficiaryId - nová osoba, v jejíchž prospěch plyne ze měnky právo
  - PreviousEndorsementId - odkaz na předchozí část rubopisu (null pro první zápis rubopisu ke směnce)

### Repositář

Rozhraní:

- IEndorsementRepository
- IPartyRepository
- IBillOfExchangeRepository

Implementace:

- EndorsementRepository
- PartyRepository
- BillOfExchangeRepository

## Poznámky k datům

- _Řad indosamentů pro směnku Id=8 obsahuje je zacyklený (z Id=13 vede na Id=70 -> což dojde až k Id=13)_
- Směnka Id=2 má stejného DrawerId=13 jako BeneficiaryId=13 (tj. směnku vystavuje sám sobě)
- Řad indosamentů pro směnku Id=10 obsahuje 2x indosament s null předchozím (Id=5 a Id=10).
- První v řadu indosantů pro směnku Id=4 zaručeně (mohou být i další případy) dává NewBeneficiaryId=13 stejné jako BeneficiaryId=13 (tj. směnku postupuje sám sobě)
- Řad inodsamentů pro směnku Id=6 zaručeně (mohou být i další případy) obsahuje po sobě jdoucí indosamenty (Id=19 a Id=35) se stejným NewBeneficiaryId=9 (tj. směnku postupuje sám soně)
