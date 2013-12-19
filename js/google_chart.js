      var queryString = '';
      var dataUrl = '';

      function onLoadCallback() {
        if (dataUrl.length > 0) {
          var query = new google.visualization.Query(dataUrl);
          query.setQuery(queryString);
          query.send(handleQueryResponse);
        } else {
          var dataTable = new google.visualization.DataTable();
          dataTable.addRows(5);

          dataTable.addColumn('number');
          dataTable.setValue(0, 0, 40);
          dataTable.setValue(1, 0, 20);
          dataTable.setValue(2, 0, 15);
          dataTable.setValue(3, 0, 10);
          dataTable.setValue(4, 0, 5);

          draw(dataTable);
        }
      }

      function draw(dataTable) {
        var vis = new google.visualization.ImageChart(document.getElementById('chart'));
        var options = {
          chf: 'a,s,000000|bg,s,67676700',
          chxs: '0,FFFFFF,11.5',
          chxt: 'x',
          chs: '350x200',
          cht: 'p',
          chco: 'BBBBBB|333333|555555|888888|CCCCCC',
          chd: 's:YMJGD',
          chdl: 'PHP|CSS|jQuery|SQL|Other',
          chdlp: 'l',
          chl: 'PHP|CSS|jQuery|SQL|Other',
          chma: '0,0,0,18|80',
          chtt: 'Skillset',
          chts: 'FFFFFF,11.5'
        };
        vis.draw(dataTable, options);
      }

      function handleQueryResponse(response) {
        if (response.isError()) {
          alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
          return;
        }
        draw(response.getDataTable());
      }

      google.load("visualization", "1", {packages:["imagechart"]});
      google.setOnLoadCallback(onLoadCallback);