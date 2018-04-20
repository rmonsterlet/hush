[
    '{{repeat(102)}}',
    { idDoc: '{{Random(1,2,3)}}',
      idLot: '{{index()}}',
      declaration: '{{random("ADDN", "DLLN", "DLSD")}}',
      isbn: 'EXP_{{firstName()}}',
      titre: '{{date()}}',
      format: '{{integer(0, 40)}}',
      etat: '{{integer(0, 40)}}',
      commentaire: '{{integer(0, 40)}}'
     
    }
  ]