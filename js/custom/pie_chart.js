let pieChart1
let pieChart2

onload = function () {
  // 예시 Pie Chart 생성
  pieChart1 = basicChart()
  pieChart2 = sampleChart()
}

// 예시 차트 1
function basicChart() {
  // 필수 항목인 id, data만 입력 한 경우
  let params = {
    id: 'basicChart', // 차트를 만들 엘리먼트의 ID,
    data: [ // 차트 슬라이스의 Data
      {
        category: '구글', // 각 항목 이름
        value: 65, // 각 항목의 값
      },
      {
        category: '러너스하이', // 각 항목 이름
        value: 35, // 각 항목의 값
      }
    ]
  }

  createPieChart(params)
}

// 예시 차트 2
function sampleChart() {
  // 사용 가능한 모든 속성 입력한 경우
  let params = {
    id: 'sampleChart', // 차트를 만들 엘리먼트의 ID
    height: '500px', // 차트의 높이 (css 속성 값 처럼 입력) - Default: '100%'
    width: '500px', // 차트의 넓이 (css 속성 값 처럼 입력) - Default: '100%'
    whole: '40%', // 도넛 차트의 가운데 구멍 크기 - Default: '40%'
    color: ['#ED6F34', '#FAF2C3', '#B0E2D2'], // 차트 슬라이스 Color - Default 컬러 있음
    innerText: { // 도넛 차트의 가운데 텍스트 설정 // Default값 없음.
      text: '러너스하이', // 보여질 텍스트
      fontSize: '20px', // 텍스트 크기 - Default: '20px'
      fontFamily: '굴림체' // 텍스트 폰트 - Default: 'Malgun Gothic'
    },
    legend: { // 범례 설정
      show: true, // [true, false] - Default : false
      width: 100, // [Number] - Default: 100
      height: 0, // [Number] - Default: undefined
      position: 'bottom', // ['left', 'right', 'top', 'bottom] - Default: 'bottom'
      fontSize: '16px', // CSS Style 값 입력 가능 - Default: 자동
      category: true, // 항목 이름 출력여부 [true, false] - Default: true
      marginTop: 10, // 범례의 상단 margin 값 [Number, %(String)] - Default: 10
      marginBottom: 10, // 범례의 상단 margin 값 [Number, %(String)] - Default: 10
      marginLeft: 10, // 범례의 상단 margin 값 [Number, %(String)] - Default: 20
      marginRight: 20, // 범례의 상단 margin 값 [Number, %(String)] - Default: 20
      marker: {
        shape: 'square', // 범례의 마커 모양 ['square', circle'] - Default: 'square'
        width: '100%', // 범례의 마커 너비 [CSS Style 값 입력] Default: '100%' (자동)
        height: '100%', // 범례의 마커 높이 [CSS Style 값 입력] Default: '100%' (자동)
        border: 0.5, // [true, false, Number(0-10)] - Default: false
      }
    },
    ticks: { // 차트 슬라이스 값 안내 선 표시 - Default: false
      show: true, // 차트 슬라이스 값 표시 [true, false] - Default: false
      itemName: false, // 슬라이스 항목 이름 표시 [true, false] - Default: true
      position: 'inside', // 값 표시 위치 ['inside', 'outside'] - Default: 'inside'
      fontSize: '16px', // CSS Style 값 입력 가능 - Default: 자동
      color: 'white' // 값 텍스트의 색상 [CSS Style 값 입력] - Default: '#000000'
    },
    tooltip: 'tooltip 글자 테스트 입니다', // 차트 슬라이스 ToolTip Text - Default: '항목 이름: 항목 값'
    data: [ // 차트 슬라이스의 Data
      {
        category: '1급', // 각 항목 이름
        value: 60, // 각 항목의 값
      },
      {
        category: '2급', // 각 항목 이름
        value: 30, // 각 항목의 값
      },
      {
        category: '3급', // 각 항목 이름
        value: 10, // 각 항목의 값
      }
    ],
    onclick: function (item) {
      console.log('item : ' + item);
      console.log(item.category + '을(를) click 했습니다!');
    } // 슬라이스 Click 이벤트
  }

  createPieChart(params)
}

// Pie Chart 생성 함수
function createPieChart(params) {
  // Params의 Data 값 정리 [color 추가]
  if (params.color)
    params.data.map((item, index) => {
      if (typeof params.color[index] !== 'undefined') item.color = params.color[index]
    })

  // 파이 컨테이너 스타일 조정
  let container = document.querySelector('#' + params.id)
  if (!container) {
    alert('Pie Chart를 만들 Dom 요소의 id를 정확히 입력해 주세요.')
    return
  }
  container.style.display = "inline-block"
  if (params.height) container.style.height = params.height
  if (params.width) container.style.width = params.width

  // 파이 차트 기본 설정
  am4core.useTheme(am4themes_animated); // 차트의 테마 (선택)
  var pieChart = am4core.create(params.id, am4charts.PieChart); // 차트 인스턴스 생성
  pieChart.innerRadius = am4core.percent(40) // 가운데 구멍 사이즈 - Default: 40
  if (params.whole) pieChart.innerRadius = am4core.percent(parseInt(params.whole.replace('%', ''))); // 가운데 구멍 사이즈

  // 그래프의 항목들 설정
  var series = pieChart.series.push(new am4charts.PieSeries());
  series.dataFields.value = "value";
  series.dataFields.category = "category";

  // Slice 내부 텍스트 설정
  if (params.innerText) {
    var innerText = series.createChild(am4core.Label)
    innerText.text = params.innerText.text
    innerText.horizontalCenter = "middle";
    innerText.verticalCenter = "middle";
    if (params.innerText.fontFamily) innerText.fontFamily = params.innerText.fontFamily
    innerText.fontSize = params.innerText.fontSize || '20px';
  }

  // Pie Slice 개별 설정
  series.slices.template.propertyFields.fill = "color"
  series.slices.template.propertyFields.isActive = "pulled";
  series.slices.template.strokeWidth = 0;

  // Pie Slice 값(ticks) 표시 옵션 (기본값 : 표시 안함)
  if (params.ticks && params.ticks.show) {
    series.alignLabels = false;
    series.labels.template.radius = am4core.percent(-30);
    series.ticks.template.disabled = params.ticks.position === 'inside';
    if (params.ticks.fontSize) series.labels.template.fontSize = params.ticks.fontSize
    if (params.ticks.color) series.labels.template.fill = am4core.color(params.ticks.color);
    if (params.ticks.itemName === false) series.labels.template.text = "{value.percent.formatNumber('#.')}%";
  } else {
    series.labels.template.disabled = true;
    series.ticks.template.disabled = true;
  }

  // Pie Slice Tooltip 텍스트
  if (params.tooltip) {
    series.slices.template.tooltipText = params.tooltip;
  }

  // 데이터 세팅
  pieChart.data = params.data

  // 범례 설정
  if (params.legend && params.legend.show) {
    var legend = new am4charts.Legend();
    var labels = legend.labels
    if (typeof params.legend.category !== 'undefined') labels.template.disabled = !params.legend.category
    if (params.legend.position) legend.position = params.legend.position
    if (params.legend.width) legend.width = params.legend.width;
    if (params.legend.height) legend.height = params.legend.height;
    if (params.legend.fontSize) legend.fontSize = params.legend.fontSize

    if (params.legend.marginTop) legend.marginTop = params.legend.marginTop
    if (params.legend.marginBottom) legend.marginBottom = params.legend.marginBottom
    if (params.legend.marginLeft) legend.marginLeft = params.legend.marginLeft
    if (params.legend.marginRight) legend.marginRight = params.legend.marginRight
    pieChart.legend = legend;

    // 범례의 모양 설정
    if (params.legend.marker) {
      var marker = pieChart.legend.markers.template.children.getIndex(0);
      if (params.legend.marker.width) marker.width = params.legend.marker.width;
      if (params.legend.marker.height) marker.height = params.legend.marker.height;
      if (params.legend.marker.shape && params.legend.marker.shape === 'circle') marker.cornerRadius(12, 12, 12, 12);
      marker.strokeWidth = 0
      if (params.legend.marker.border) marker.strokeWidth = params.legend.marker.border || 1;
      marker.strokeOpacity = 1;
    }
  }

  // 클릭 이벤트 설정
  if (params.onclick) {
    series.slices.template.events.on("hit", function (event) {
      params.onclick(event.target.dataItem.dataContext)
    });
  }

  return pieChart
}