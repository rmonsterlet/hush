// GOTO https://www.json-generator.com/ with :
[
    '{{repeat(102)}}',
    {
      idLot: '{{index()}}',
      type: '{{random("ADDN", "DLLN", "DLSD")}}',
      expediteur: 'EXP_{{firstName()}}',
      dateModif: '{{date()}}',
      nonAssignes: '{{integer(0, 40)}}',
      valide: '{{integer(0, 40)}}',
      rejete: '{{integer(0, 40)}}',
      suspendu: '{{integer(0, 40)}}',
      nbDocs: function(){
          return this.nonAssignes + this.valide + this.rejete + this.suspendu;
      }
    }
  ]