<template>
  <section>
      <!--b-table :data="dataf" :columns="columns" striped="true" hoverable="true" paginated_="true" per-page_="6"></b-table-->
      <div class="columns">
          <div class="column is-6" v-html="w('Название')"></div>
          <div class="column is-6" v-html="w('Описание')"></div>
      </div>      
      <div class="columns"
        v-for="(d, index) in dataf"
        :key="index"      
      >
          <div class="column is-6" v-html="w(d.name)"></div>
          <div class="column is-6" v-html="w(d.desc)"></div>
      </div>
      <b-button @click="rows=rows+10" size="is-medium" icon-left="arrow-expand-down" style="width:100%;margin-top:30px">
        показать ещё
      </b-button>
  </section>
</template>

<script>
import { w } from "../modules/theme.ts";

export default {
  props:{
    showAll: {type:Boolean,default:false},
  },    
  computed: {
    dataf: function () {
      return this.showAll? this.data : this.data.slice(0,this.rows);
    }
  },    
  data() {
    return {
      //selDoc: null,
      //showModal: false,
        rows: 10,
        /*columns: [
                    {
                        field: 'name',
                        label: 'Название',
                    },
                    {
                        field: 'desc',
                        label: 'Описание',
                    },
        ],*/

        data: [

{name:'Geo.Series 2009',desc:'Система для проектирования, оценки качества строительства и безопасной эксплуатации магистральных и промысловых нефтегазопроводов, нефтепродуктопроводов, трубопроводов сетей газоснабжения и транспортировки пластовых вод.',tags:'Расчетное ПО'},
{name:'ABBYY PDF Transformer 3.0',desc:'Программа конвертирования любых PDF документов в редактируемые форматы, создания PDF из приложений Microsoft® Office, объединения несколько разных документов в один PDF файл.',tags:'Офисное ПО |Расчетное ПО|ABBYY'},
{name:'ABBYY FineReader 10',desc:'Система распознавания документов.',tags:'Офисное ПО |Расчетное ПО|ABBYY'},
{name:'ABBYY Lingvo х5',desc:'Электронный словарь.',tags:'Офисное ПО |Расчетное ПО|ABBYY'},
{name:'ACDSee',desc:'Программа работы с графическими изображениями, сортировки изображений по параметрам, поддерживающая более 100 графических форматов.',tags:'Офисное ПО '},
{name:'Acronis True Image Enterprise Server virtual ed.',desc:'Комплексное решение резервного копирования и аварийного восстановления данных серверов на базе ОС Windows и Linux.',tags:'Расчетное ПО'},
{name:'Adobe Acrobat Professional 8/10/11',desc:'Создание и совместное использование документов и форм PDF. Переименован в Acrobat X Pro.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ADOBE CREATIVE SUITE',desc:'Комплексное решение создания веб сайтов и цифровых проектов профессионального уровня на базе отраслевых стандартов.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Adobe Photoshop 7.0',desc:'ПО для создания фотореалистических изображений и работы с цветными сканированными изображениями.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Friendly Pinger',desc:'Программа для администрирования, мониторинга и инвентаризации компьютерных сетей.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ANSYS Mechanical',desc:'Система конечно элементного анализа для решения линейных и нелинейных, стационарных и нестационарных пространственных задач механики деформируемого твёрдого тела и механики конструкций, задач механики жидкости и газа, теплопередачи и теплообмена, электродинамики, акустики, а также механики связанных полей.',tags:'Расчетное ПО|ANSYS'},
{name:'Autodesk Infrastructure Design Suit Premium 2018 в составе: AutoCAD Civil 3D, AutoCAD, Autodesk 3DS Max Design, Autodesk Nawiswork Simulate, AutoCAD Map 3D.',desc:'ПК для планирования, проектирования, управления строительством и эксплуатацией объектов транспортной, земельной, водной и энергетической инфраструктуры.',tags:'ПО для проектирования|Расчетное ПО|Autodesk'},
{name:'Autodesk Product Design Suite Premium 2018 в составе: AutoCAD, Inventor® Routed Systems, AutoCAD® Electrical, AutoCAD® Mechanical, Autodesk® Navisworks® Simulate, Autodesk® 3ds Max® Design.',desc:'ПК для промышленного 3D проектирования, динамического анализа изделий, создания инструментальной оснастки и обмена проектными данными на платформе AutoCAD.',tags:'ПО для проектирования|Расчетное ПО|Autodesk'},
{name:'Autodesk Building Design Suite Standard 2018 в составе: AutoCAD®, AutoCAD® Architecture, AutoCAD® MEP, AutoCAD® Structural Detailing',desc:'ПК для проектирования строительных конструкций, инженерных сетей, визуализации и инженерных расчетов.',tags:'ПО для проектирования|Расчетное ПО|Autodesk'},
{name:'Autodesk Building Design Suite Premium 2018 в составе: AutoCAD®, AutoCAD® Architecture, AutoCAD® MEP, AutoCAD® Structural Detailing, Autodesk® Revit®, Autodesk® 3ds Max® Design, Autodesk®Navisworks®Simulate.',desc:'ПК, объединяющий технологию информационного моделирования (BIM) и средства САПР для эффективного проектирования, визуализации и инженерных расчетов.',tags:'ПО для проектирования|Расчетное ПО|Autodesk'},
{name:'Autodesk 3DS Max Design 2018.',desc:'Программа трехмерного моделирования, анимации и визуализации.',tags:'ПО для проектирования|Расчетное ПО|Autodesk'},
{name:'Autodesk Naviswork Manage 2018.',desc:'Программа для визуализации и анимации.',tags:'ПО для проектирования|Расчетное ПО|Autodesk'},
{name:'Autodesk® Plant Design Suite Premium 2018 в составе: AutoCAD, Auto С ad P&ID, Auto Сad Plant 3D, Auto С ad Structural Detailing, Autodesk Revit Structure, Autodesk Navisworks Simulate, Autodesk Showcase, Autodesk SketchBook Designer.',desc:'Система для проектирования трубопроводов и КИП, 3D — моделирования, проектирования строительных конструкций, компоновки промышленного оборудования, разработки технологических линий, выявления коллизий и выпуска рабочей документации.',tags:'ПО для проектирования|Расчетное ПО|Autodesk'},
{name:'AutoCAD Raster Design 2008. ',desc:'Средства редактирования растровых изображений и преобразования растровых данных в векторные данные на платформе AutoCAD.',tags:'ПО для проектирования|Расчетное ПО|Autodesk'},
{name:'Bentley MicroStation 08.01.02.15. ru ',desc:'Платформа для проектирования, моделирования, визуализации, документирования и картографирования проектов.',tags:'ПО для проектирования|Расчетное ПО|Bentley Systems'},
{name:'Bentley PlantSpace Design Series 08.01.01.20 ru ',desc:'ПК для компоновки технологического оборудования и проектирования трубопроводов и коммуникаций на платформе MicroStation.',tags:'ПО для проектирования|Расчетное ПО|Bentley Systems'},
{name:'Bentley PowerDraft 08.01.01.19.ru ',desc:'Приложение для получения 2D/3D чертежей и деталировок.',tags:'ПО для проектирования|Расчетное ПО|Bentley Systems'},
{name:'Bentley TriForma Structural 08.01.00.06',desc:'ПК для проектирования конструкций из металла, дерева или бетона на платформе MicroStation TriForma.',tags:'ПО для проектирования|Расчетное ПО|Bentley Systems'},
{name:'Bentley MicroStation Descartes 08.01.02.10.en ',desc:'ПК для решения задач визуализации, картографирования и преобразования растровых данных в векторные данные на платформе MicroStation. Переименован в Bentley Descartes.',tags:'ПО для проектирования|Расчетное ПО|Bentley Systems'},
{name:'Bentley ProSteel Professional V8i ',desc:'ПК для моделирования и проектирования металлических конструкций зданий и сооружений на платформе AutoCAD.',tags:'ПО для проектирования|Расчетное ПО|Bentley Systems'},
{name:'Bentley PlantFLOW Plus',desc:'Программа гидравлических расчётов трубопроводных систем. Позволяет рассчитывать перепады давлений и скорости течения в разомкнутых и замкнутых трубопроводных сетях.',tags:'ПО для проектирования|Расчетное ПО|Bentley Systems'},
{name:'CorelDRAW. GraphicsSuite 12',desc:'Программа создания векторных иллюстраций и подготовки веб графики.',tags:'Расчетное ПО'},
{name:'DIALux',desc:'Программное обеспечение для расчета освещенности.',tags:'Расчетное ПО'},
{name:'ArcGIS ArcView (базовый + ArcGIS 3DAnalist+ ArcGIS Spatial Analist)',desc:'Геоинформационная система (ГИС) для наглядного представления, исследования, запрашивания и анализа пространственных данных.',tags:'Расчетное ПО'},
{name:'ЭОЛ (ГАЗ)-2000(h) 4.0',desc:'Методика расчёта концентраций в атмосферном воздухе вредных веществ ОНД-86.',tags:'Расчетное ПО'},
{name:'ONEPLAN RPLS',desc:'Комплекс планирования и оптимизации сетей подвижной и фиксированной радиосвязи. XML локальная версия с достаточным функциональным набором.',tags:'Расчетное ПО'},
{name:'MathCAD Profesional Prime 2.0',desc:'Система компьютерной алгебры, ориентированная на подготовку интерактивных документов с вычислениями и визуальным сопровождением.',tags:'Расчетное ПО'},
{name:'MapInfo Professional 10.5 Rus (лок)',desc:'Система разработки специальных карт и работы с материалами экологических изысканий подрядных организаций.',tags:'Расчетное ПО'},
{name:'MapInfo Professional 10.5 Rus (сет)',desc:'Система разработки специальных карт и работы с материалами экологических изысканий подрядных организаций.',tags:'Расчетное ПО'},
{name:'Printer Activity Monitor',desc:'Программа мониторинга принтеров предприятия, позволяющая отслеживать кто, когда и сколько распечатал страниц.',tags:'Офисное ПО |Расчетное ПО'},
{name:'TheBat! 5/6',desc:'Клиент электронной почты, позволяющий работать с неограниченным количеством почтовых ящиков, использует средства фильтрации писем, шаблона сообщений, диспетчер писем.',tags:'Офисное ПО '},
{name:'SolidWorks Premium 2013 SP04',desc:'Система автоматизированного 3D проектирования.',tags:'Расчетное ПО'},
{name:'X360 Multi-page Tiff Viewer ActiveX Control',desc:'Программа для создания приложений с функцией просмотра многочисленных страниц TIFF.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ИИС «Кодекс»',desc:'Справочная система, содержащая информацию для организации охраны труда, обеспечения безопасных условий труда на производстве.',tags:'Расчетное ПО'},
{name:'КОМПАС-3D. Библиотека проектирования металлоконструкций КМ V11 Plus',desc:'Графическая библиотека элементов, используемых при проектировании металлоконструкций на платформе КОМПАС-3D.',tags:'Расчетное ПО'},
{name:'КОМПАС-3D V11 Plus',desc:'ПК для трёхмерного моделирования при архитектурно строительном и технологическом проектировании.',tags:'Расчетное ПО'},
{name:'КОМПАС График 5.Х',desc:'ПК для решения задач 2D проектирования и выпуска документации. Входит в состав КОМПАС-3D.',tags:'Расчетное ПО'},
{name:'КОМПАС-3D. Библиотека проектирования металлоконструкций КМ V11 Plus',desc:'Графическая библиотека элементов, используемых при проектировании металлоконструкций на платформе КОМПАС-3D.',tags:'Расчетное ПО'},
{name:'КОМПАС-График. Система проектирования металлоконструкций V11 Plus',desc:'Графическая система проектирования металлоконструкций на платформе КОМПАС График.',tags:'Расчетное ПО'},
{name:'КОМПАС-График. Библиотека СПДС-обозначений V11 Plus',desc:'Графическая библиотека для оформления чертежно графической документации в соответствии с ГОСТ 21.101–97 на платформе КОМПАС-График.',tags:'Расчетное ПО'},
{name:'КОМПАС-График. Система генерации спецификаций V11 Plus',desc:'Система генерации и оформления спецификаций по российским стандартам.',tags:'Расчетное ПО'},
{name:'КОМПАС-3D. Библиотека проектирования систем электроосвещения V11 Plus',desc:'Графическая библиотека элементов, используемых при проектировании систем электроосвещения на платформе КОМПАС-3D.',tags:'Расчетное ПО'},
{name:'Галактика ERP',desc:'Управленческая информационная система, обеспечивающая обобщение и анализ информации по всем разделам хозяйственной деятельности предприятия.',tags:'Расчетное ПО'},
{name:'ДИСАП-ЦРРЛ',desc:'Диалоговая система автоматизированного проектирования цифровых радиорелейных линий связи. Решение реальных задач проектирования РРЛ методикой автоматизированного расчёта цифровых РРЛ.',tags:'Расчетное ПО'},
{name:'АСТРА-НОВА 2013',desc:'Комплекс автоматизированного проектирования и расчёта трубопроводных систем на статическую и циклическую прочность, на сейсмические воздействия, вибропрочность и неустановившиеся динамические процессы.',tags:'Расчетное ПО'},
{name:'АСТРА-ВИБР 2013',desc:'Программа расчёта на вибропрочность для режимов установившихся вынужденных колебаний.',tags:'Расчетное ПО'},
{name:'АСТРА-НЕФТЕХИМ 2013',desc:'Указания по расчёту на прочность и вибрацию технологических стальных трубопроводов по РТМ 38.001–94.',tags:'Расчетное ПО'},
{name:'АСТРА-СТАДИО 2013',desc:'Программа расчёта температурного и напряжённого состояния, статической, сейсмической и циклической прочности деталей элементов трубопроводов: тройников, отводов, переходов, линзовых компенсаторов и др.',tags:'Расчетное ПО'},
{name:'АСТРА-СТАЦ 2013',desc:'Программа расчёта на статическую и циклическую прочность низко и высокотемпературных трубопроводов.',tags:'Расчетное ПО'},
{name:'АСТРА-ФОРМ 2013',desc:'Программа определения значимых собственных частот и форм колебаний системы в заданном частотном диапазоне.',tags:'Расчетное ПО'},
{name:'ПОСТ-АСТРА 2013',desc:'Программа выдачи таблиц результатов расчётов, визуализации расчётной модели, перемещений, нагрузок на опоры, генерации отчёта.',tags:'Расчетное ПО'},
{name:'ПРЕ-АСТРА 2013',desc:'Программа задания, генерации и визуализации рациональных пространственно стержневых расчётных моделей трубопроводных систем с возможностями использования баз данных по материалам, опорам, пружинным подвескам и фланцевым соединениям на платформе ПК «АСТРА НОВА».',tags:'Расчетное ПО'},
{name:'АСТРА-ДИН 2013',desc:'Программа расчета неустановившихся вынужденных колебаний при заданных динамических нагрузках для различных переходных и аварийных режимов эксплуатации.',tags:'Расчетное ПО'},
{name:'АСТРА-СЕЙСМ 2013',desc:'Программа расчета на сейсмические воздействия, заданные спектрами ускорений, с определением перемещений, ускорений, усилий и напряжений.',tags:'Расчетное ПО'},
{name:'Spotlight',desc:'Редактор растровой и векторной графики.',tags:'Расчетное ПО'},
{name:'ElectriCS Light ',desc:'Система светотехнических расчётов при проектировании осветительных установок промышленных предприятий.',tags:'Расчетное ПО'},
{name:'EnergyCS Режим',desc:'ПК для выполнения электротехнических расчетов при проектировании и эксплуатации электроэнергетических систем любой сложности.',tags:'Расчетное ПО'},
{name:'EnergyCS ТК',desc:'ПК для выполнения электротехнических расчетов при проектировании и эксплуатации электроэнергетических систем любой сложности.',tags:'Расчетное ПО'},
{name:'EnergyCS Электрика',desc:'ПК для выполнения электротехнических расчётов при проектировании и эксплуатации распределительных сетей низкого и среднего напряжения.',tags:'Расчетное ПО'},
{name:'Electrics ESP',desc:'ПК для автоматизированного расчета электрохимзащиты.',tags:'Расчетное ПО'},
{name:'Model Studio CS Молниезащита',desc:'Программа расчета и трехмерного интерактивного проектирования молниезащиты зданий, сооружений и открытых территорий.',tags:'Расчетное ПО'},
{name:'Информационная система NormaCS (разделы 75 и 1001)',desc:'Актуальная база нормативно технических документов.',tags:'Расчетное ПО'},
{name:'ПОТОК',desc:'Расчет систем отопления, охлаждения, теплоснабжения калориферов и оборудования.',tags:'Расчетное ПО'},
{name:'VSV',desc:'Воздуховоды систем вентиляции.',tags:'Расчетное ПО'},
{name:'RTI',desc:'Расчет потерь тепла и инфильтрации для помещений.',tags:'Расчетное ПО'},
{name:'STOL',desc:'Расчет воздухообмена предприятий общественного питания.',tags:'Расчетное ПО'},
{name:'Профессиональная ГИС «Карта» 9.15',desc:'Геоинформационная система (ГИС), предназначенная для создания и редактирования электронных карт, выполнения различных измерений и расчётов, оверлейных операций, построения 3D моделей, обработки растровых данных, средства подготовки графических документов в электронном и печатном виде.',tags:'Расчетное ПО'},
{name:'Bentley ProSteel. АР-КJ Адаптация комплекса под марку КЖ',desc:'Автоматическое создание арматурной сетки по серии 1.412.1–6, вып. 1 и по ГОСТ 23279–85, закладных изделий по серии 1.400–15 на платформе AutoCAD.',tags:'Расчетное ПО'},
{name:'Bentley ProSteel. АР-ТU Типовые узлы',desc:'Автоматическое создание типовых шарнирных узлов балочных клеток по серии 2.440–2, вып.1 (узлы 1-29) на платформе AutoCAD.',tags:'Расчетное ПО'},
{name:'Bentley ProSteel. АР-ТК. Типовые конструкции',desc:'Автоматическое создание лестниц, площадок, ограждений и стремянок по серии 1.450.3–7.94 (холодногнутые и горячекатаные), элементов по серии 1.450.3–7.94, элементов опор под нефтяные сепараторы по серии 1331КМ, а также элементов опор ЛЭП по серии 3.407.9–146, вып. 3 на платформе AutoCAD.',tags:'Расчетное ПО'},
{name:'Bentley ProSteel. БД металлопроката',desc:'База данных на металлопрокат по российским стандартам и на марки стали, на платформе AutoCAD.',tags:'Расчетное ПО'},
{name:'Stalker 4.09',desc:'ПО для расчета нормативных объемов образования отходов производства и потребления.',tags:'Расчетное ПО'},
{name:'Ливневка-Платежи 2010',desc:'Программа расчёта платы за неорганизованный сброс загрязняющих веществ с территории предприятий и организаций в водные объекты.',tags:'Расчетное ПО'},
{name:'Определение класса опасности отходов. Справочник отходов 2011',desc:'Программа расчёта класса опасности отходов; ведения справочников и классификаторов отходов.',tags:'Расчетное ПО'},
{name:'ПК «Зеркало ++» 4.30',desc:'Программа расчёта концентрации загрязняющих веществ в водных объектах и решения обратной задачи.',tags:'Расчетное ПО'},
{name:'ПК «Призма предприятие» 4.3.03',desc:'Программа автоматизированной поддержки принятия управленческих, технологических и проектных решений по формированию комплексов воздухоохранных мероприятий для предприятия.',tags:'Расчетное ПО'},
{name:'ПК «Шум» 4.03',desc:'Программа расчёта на основании «Рекомендаций по разработке проектов санитарно защитных зон промышленных предприятий, групп предприятий» (1998) и СНиП II-12–77 «Защита от шума».',tags:'Расчетное ПО'},
{name:'ПК “Модульный ЭкоРасчет”',desc:'Серия программ для определения валовых и максимально разовых выбросов (выделений) загрязняющих веществ от различных производств, оборудования, технологических процессов и операций.',tags:'Расчетное ПО'},
{name:'Lotsia PDM Plus',desc:'Система автоматизации управления данными, документооборотом и электронным архивом.',tags:'Офисное ПО |Расчетное ПО'},
{name:'GeoniCS 2013',desc:'ПК для создания топографических планов, построения трёхмерной модели рельефа, проектирования промышленных объектов, внешних инженерных сетей и линейно — протяжённых объектов, оформления выходных документов.',tags:'Расчетное ПО'},
{name:'IndorPavement Expert: Система расчёта дорожных одежд. Экспертная версия.',desc:'Программа для автоматизированного конструирования и расчёта дорожных одежд автомобильных дорог общего пользования, городских улиц и дорог.',tags:'Расчетное ПО'},
{name:'AspenONE Engineering (ASPEN HYSYS)',desc:'Инженерный пакет программ для комплексного проектирования и моделирования, эксплуатации и оптимизации технологических процессов в области системы сбора, подготовки, переработки и транспорта газа и газоконденсата, в том числе производства СПГ.',tags:'Расчетное ПО'},
{name:'AVEVA E3D',desc:'Среда проектирования для всех проектных дисциплин c централизованным хранением данных, предназначенных для трехмерного проектирования промышленных предприятий. Система включает в себя модули для проектирования оборудования, трубопроводов, системы отопления, вентиляции и кондиционирования, структуры и кабельных лотков.',tags:'Расчетное ПО'},
{name:'AVEVA Diagrams',desc:'Приложение для создания технологических схем трубопроводов, а также схем отопления, вентиляции и кондиционирования воздуха.',tags:'Расчетное ПО'},
{name:'AVEVA Instrumentation',desc:'ПК для проектирования контрольно измерительных систем и автоматики промышленных объектов.',tags:'Расчетное ПО'},
{name:'AVEVA Shematics 3D Integration',desc:'Программа для обеспечения согласованности данных между технологической схемой и 3D моделью системы PDMS.',tags:'Расчетное ПО'},
{name:'AVEVA Multi-Discipline Support',desc:'Программа для расстановки опор.',tags:'Расчетное ПО'},
{name:'AVEVA Pipe Stress Interface',desc:'Программа для интеграции с расчетными программами.',tags:'Расчетное ПО'},
{name:'AVEVA Review',desc:'Инструмент визуализации 3D-модели.',tags:'Расчетное ПО'},
{name:'AVEVA Mechanical Equipment Interface',desc:'Модуль конвертации.',tags:'Расчетное ПО'},
{name:'Erdas Imagine (базовый + Objectiv + Vector)',desc:'Программа для обработки данных дистанционного зондирования (в основном, данных ДЗЗ).',tags:'Расчетное ПО'},
{name:'Caesar',desc:'Комплексная программа для расчета напряжений в трубопроводных системах любой сложности.',tags:'Расчетное ПО'},
{name:'Smart Plant Instrumentation',desc:'Программный комплекс для проектирования и эксплуатации КИПиА и систем управления.',tags:'Расчетное ПО'},
{name:'PIPEFLO 9.1.1',desc:'Программа для моделирования установившихся процессов при проектировании трубопроводов.',tags:'Расчетное ПО'},
{name:'Oracle Crystal Ball',desc:'Табличное приложений для предиктивного моделирования, прогнозирования, моделирования и оптимизации при расчете финансовых рисков.',tags:'Расчетное ПО'},
{name:'Primavera P6 Enterprise Project Portfolio Management',desc:'Программное обеспечение для управления и контроля проектов, отслеживания ресурсов, материалов и оборудования, используемого на проект.',tags:'Расчетное ПО'},
{name:'Free PDF',desc:'PDF-принтер.',tags:'Офисное ПО '},
{name:'OLGA (базовый модуль + модуль PVTSIM) 6.3.0.2',desc:'Система для имитационного моделирования процессов течения многофазных сред в трубопроводах в нестационарных режимах при проектировании объектов газовой промышленности.',tags:'Расчетное ПО'},
{name:'PRO/II',desc:'Выполняет расчеты материальных и тепловых балансов для широкого диапазона технологических процессов.',tags:'Расчетное ПО'},
{name:'PIPEPHASE',desc:'Расчет технологических процессов.',tags:'Расчетное ПО'},
{name:'Microsoft Visual Studio Prof 2005/2008',desc:'Линейка продуктов компании Майкрософт, включающих интегрированную среду разработки программного обеспечения и ряд других инструментальных средств.',tags:'Офисное ПО |Расчетное ПО|Microsoft'},
{name:'MS SQL Server 2000/2005/2008',desc:'Система управления реляционными базами данных (СУБД), разработанная корпорацией Microsoft.',tags:'Офисное ПО |Расчетное ПО|Microsoft'},
{name:'MS System Center Virtual Machine Manager',desc:'Управление физическими и виртуальными машинами, оптимизирование производительности и ресурсов (PRO) для динамичного и оперативного контроля над виртуальной инфраструктурой.',tags:'Офисное ПО |Расчетное ПО|Microsoft'},
{name:'MS Windows ME/2000/XP Home Professional WIN7/WIN8/WIN10',desc:'Пользовательская операционная система.',tags:'Офисное ПО |Расчетное ПО|Microsoft'},
{name:'MS project server 2008/2013',desc:'Система управления проектами.',tags:'Офисное ПО |Расчетное ПО|Microsoft'},
{name:'Microsoft Visual Studio Prof 2005/2008',desc:'Линейка продуктов компании Майкрософт, включающих интегрированную среду разработки программного обеспечения и ряд других инструментальных средств.',tags:'Офисное ПО |Расчетное ПО|Microsoft'},
{name:'MS SharePoint',desc:'Серверная часть веб-портала.',tags:'Офисное ПО |Расчетное ПО|Microsoft'},
{name:'MS Windows Server 2003/2008 ent/2012 datacenter',desc:'Серверная операционная система, обеспечивающая совместную работу, повышенную безопасность доступа к интернету, защищённое хранение данных, надёжную печать, возможность запуска рабочих приложений.',tags:'Офисное ПО |Расчетное ПО|Microsoft'},
{name:'MS Project Professional 2010 +ProjCAL/2013',desc:'Программа управления проектами.',tags:'Офисное ПО |Расчетное ПО|Microsoft'},
{name:'MS Office 2003 prof plus 2007/2010 Home/Business/ 2013 prof plus',desc:'Офисный пакет приложений для работы с различными типами документов.',tags:'Офисное ПО |Расчетное ПО|Microsoft'},
{name:'MS Office Front Page XP/ 2003',desc:'WYSIWYG редактор HTML для разработки страниц веб узла. Входит в состав пакета приложений Microsoft Office. В Microsoft Office 2007 программа FrontPage была заменена SharePoint Designer и Microsoft Expression Web.',tags:'Офисное ПО |Расчетное ПО|Microsoft'},
{name:'Антивирус Касперского',desc:'Антивирусная защита персонального компьютера от основных информационных угроз.',tags:'Офисное ПО '},
{name:'Расходомер-ИCO',desc:'Программа расчёта расхода жидкостей и газов; выбора методов и средств измерений расхода природного газа; расчёта метрологических характеристик и расхода.',tags:'Офисное ПО |Расчетное ПО'},
{name:'BudCAD SE 1.4',desc:'Система автоматизированного проектирования объектов строительства.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ПО CREDО: линейные изыскания 1.1 + Dat 4.1 lite',desc:'Комплекс, обеспечивающий автоматизированную обработку инженерных изысканий, подготовку данных для различных геоинформационных систем, создание и инженерное использование цифровых моделей местности.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ПО CREDО: Transkor + Dat 4.1 Professional',desc:'Комплекс, обеспечивающий автоматизированную обработку инженерных изысканий, подготовку данных для различных геоинформационных систем, создание и инженерное использование цифровых моделей местности.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Credo Дороги',desc:'Программный комплекс для проектирования строительства, реконструкции и ремонта автомобильных дорог и транспортных развязок.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Credo ZNAK',desc:'Программный комплекс для проектирования строительства, реконструкции и ремонта автомобильных дорог и транспортных развязок.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Credo Осадка',desc:'Программный комплекс для получения объемов работ по осадке и/или выторфовке болот под насыпью автодорог для принятия наиболее оптимальный способа возведения земляного полотна автодороги на данных грунта.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Credo Съезды',desc:'Программный комплекс для проектирования съездов, мест пересечений и примыканий к внешним дорогам с достаточной быстротой и корректностью.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Credo Визуализация',desc:'Программный комплекс для проектирования строительства, реконструкции и ремонта автомобильных дорог и транспортных развязок.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Сredo Грис',desc:'ПК для расчета стоков дождевых и талых вод и пропускную способность сооружаемых труб.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Credo Конвертер',desc:'Программный комплекс для проектирования строительства, реконструкции и ремонта автомобильных дорог и транспортных развязок.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Газ Конд Нефть 2004',desc:'Система компьютерного моделирования технологий промыслового сбора и обработки природного газа и нефти, газоразделения и фракционирования нефти и конденсата.',tags:'Офисное ПО |Расчетное ПО'},
{name:'QD Professional ',desc:'Программа для ведения эффективной внешнеэкономической деятельности – справочная система по таможенному законодательству, заполнение грузовой таможенной декларации.',tags:'Офисное ПО |Расчетное ПО'},
{name:'РТСТ',desc:'Программа расчёта толщины стенки трубопровода по СНиП 2.05.06–85 и СП 34-116–97.',tags:'Офисное ПО |Расчетное ПО'},
{name:'BioLink SDK',desc:'Комплект прикладных биометрических решений, позволяет быстро и легко встраивать функции биометрической идентификации в продукты и системы независимых производителе.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ВИКС-СТУДИЯ. Комфорт-В 2.1',desc:'Система проектирования рабочих чертежей вентиляции в ПК ВИКС-СТУДИЯ на платформе AutoCAD.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ВИКС-СТУДИЯ. Комфорт-ВК 2.1 ',desc:'Проектирование систем водопровода и канализации в ПК ВИКС-СТУДИЯ на платформе AutoCAD.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ВИКС-СТУДИЯ. Комфорт-О 2.1',desc:'Система проектирования рабочих чертежей отопления в ПК ВИКС-СТУДИЯ на платформе AutoCAD.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ПК АВК 5',desc:'Программа для автоматизированного выпуска ресурсной стоимостной документации, используемой в строительстве.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Система ПИР 2012',desc:'Система для определения стоимости проектно-изыскательских работ.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ЭСПРИ 1.0',desc:'Серия справочных и расчётных программ для проектной, инженерной и исследовательской работы.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ПК МИРАЖ (ЛИРА) 2013 PRO',desc:'Комплекс для численного исследования прочности и устойчивости конструкций и их автоматизированного проектирования.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ПК ЛИРА. Вариация моделей 2013',desc:'Расчетная программа с возможностью варьирования характеристиками жёсткости элементов и граничными условиями.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ПК ЛИРА. ГРУНТ 2013',desc:'Программа ориентирована на автоматическое определение переменного по области фундаментной плиты коэффициента постели.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ПК ЛИРА. Динамика+ 2013',desc:'Программа реализует метод прямого интегрирования уравнений движения по времени и позволяет производить компьютерное моделирование поведения конструкции под динамическими нагрузкам.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ПК ЛИРА. КМ 2013',desc:'Программа предназначена для получения в автоматизированном режиме полного набора рабочих чертежей КМ.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ПК ЛИРА. Монтаж+ 2013',desc:'Программа позволяет отслеживать напряжённое состояние сооружения в процессе его возведения.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ПК ЛИРА. МОСТ 2013',desc:'Программа позволяет строить поверхности влияния в назначенных пользователем элементах мостовой конструкции от подвижной нагрузки.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ПК «Мономах»',desc:'Предназначен для расчета и проектирования железобетонных и кирпичных конструкций многоэтажных зданий с планами произвольной конфигурации.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Система Лига: Закон',desc:'Правовые базы данных.',tags:'Офисное ПО '},
{name:'SCAD OFFICE 11.5, включая все доп. модули',desc:'Интегрированная система прочностного анализа и проектирования конструкций.',tags:'Офисное ПО |Расчетное ПО'},
{name:'СТАРТ',desc:'Программа расчёта прочности и жёсткости трубопроводов различного назначения, имеющих произвольную конфигурацию в пространстве, при статическом и циклическом нагружении, а также толщин стенок труб и соединительных деталей на давление.',tags:'Офисное ПО |Расчетное ПО'},
{name:'СТАРТ. Dxf',desc:'Программа экспорта расчётной схемы (осевой линии и со всеми элементами и номерами узлов) в файл типа dxf для последующей обработки графическими инструментальными системами AutoCAD или MicroStation.',tags:'Офисное ПО |Расчетное ПО'},
{name:'СТАРТ. Грунт',desc:'Программа позволяет производить расчёт трубопровода с участками, защемлёнными в грунте (бесканальной прокладки), а также оценивать прочность пенополиуретановой изоляции.',tags:'Офисное ПО |Расчетное ПО'},
{name:'СТАРТ. Отбраковочная толщина',desc:'Программа расчёта отбраковочных толщин труб и соединительных деталей (отводов, переходов, тройников, заглушек) технологических трубопроводов согласно требованиям стандарта ассоциации «Ростехэкспертиза» СА 03-005–07.',tags:'Офисное ПО |Расчетное ПО'},
{name:'СТАРТ-Проф',desc:'Программа расчёта прочности и жёсткости трубопроводов различного назначения, имеющих произвольную конфигурацию в пространстве, при статическом и циклическом нагружении, а также толщин стенок труб и соединительных деталей на давление. Расчёт длинных трубопроводов, защемлённых в грунте.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Штуцер-МК',desc:'Программа расчёта на прочность узлов врезки и определения допустимых нагрузок.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Гидросистема',desc:'Программа гидравлического и теплогидравлического расчёта, а также выбора диаметров трубопроводных систем различного назначения с детальным учётом местных сопротивлени.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Предклапан',desc:'Программа расчёта и выбора предохранительных клапанов, с гидравлическим расчётом подводящего и отводящего трубопроводов.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Prompt',desc:'Программа машинного перевода текстовых документов с одного языка на другой.',tags:'Офисное ПО '},
{name:'Universal Transit Manager 2009',desc:'Автоматизация проектирования модульных вводов кабелей.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Pragma Office 5.4/6.4',desc:'Программа машинного перевода текстовых документов с одного языка на другой.',tags:'Офисное ПО '},
{name:'Remote Administration 2.0',desc:'Программа удалённого администрирования ПК для платформы Windows.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Rubius Electric Suite: ЛЭП 0,4–10 Кв для AutoCAD (Ultimate edition)',desc:'Проектирование линий электропередач.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Rubius Electric Suite: M3 AutoCAD (Ultimate edition)',desc:'Проектирование молниезащиты.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ПК Гранд Смета',desc:'Программа для составления и расчёта сметной документации.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Frost 3D Universal (версия 64 бита, многоядерная CPU)',desc:'Программный комплекс для трехмерного численного моделирования тепловых режимов многолетнемерзлых грунтов.',tags:'Офисное ПО |Расчетное ПО'},
{name:'АРМ Акустика',desc:'Автоматизация деятельности при оценке внешнего акустического воздействия.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Система Трубопровод 2012 ',desc:'Система для проектирования магистральных трубопроводов на платформе AutoCAD.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ПК «Эксперт ЭМС» 2010',desc:'Программа для автоматизации расчётов ЭМС РЭС, работающих в диапазоне частот 30 МГц — 40 ГГц и расположенных на локальном объекте.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Эксперт РРЛ 2010',desc:'Программа расчёта интервалов цифровых радиорелейных линий связи.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ТМкарта 14.3',desc:'Отображение маршрутов следования грузовых поездов; расчёт провозных платежей; хранение и отображение данных архива слежения за вагонам.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ПК Смета-Багира',desc:'Строительная программа для составления и расчёта сметной документаци.',tags:'Офисное ПО |Расчетное ПО'},
{name:'СУБД «ГИДРОРАСЧЕТЫ» 2008 ',desc:'Программа ведения баз данных по различным гидрологическим и другим характеристикам и для выполнения различных расчётов в соответствии с СП 33101–2003.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Взрыв ТВС 2008',desc:'Программа определения степени вероятного поражения людей и повреждений зданий от взрывной нагрузки при авариях с взрывами топливно-воздушных смесей.',tags:'Офисное ПО |Расчетное ПО'},
{name:'МАГИСТРАЛЬ 2008',desc:'Программа для определения зон действия поражающих факторов аварий на подземных магистральных газопроводах, зон поражения человека поражающими факторами, зонирования территории магистрального газопровода по критериям индивидуального риска.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Оценка риска 2008',desc:'Программа расчёта зон барического поражения взрывом ТВС, термического поражения пожаров пролива и "огненного шара ", выдача расширенного отчёта.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Оценка ущерба 2008',desc:'Программа количественного определения ущерба от аварий, происходящих на опасных производственных объектах.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Токси v 2.1.3',desc:'Программа для оценки масштабов поражения при промышленных авариях с выбросом опасных химических веществ (ОХВ).',tags:'Офисное ПО |Расчетное ПО'},
{name:'Топоматик Robur – Дорожная одежда 4.0',desc:'Программа расчёта конструкции дорожной одежды по ОДН 218.046–01.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Base 7.3',desc:'Система общестроительных расчётов фундаментов, рам и элементов каркаса, плит и балок.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Фундамент',desc:'Программа расчёта фундаментов, ростверков и подпорных стен на любом основании на сейсмические нагрузки.',tags:'Офисное ПО |Расчетное ПО'},
{name:'NormCAD 6.1',desc:'Расчёты строительных конструкций по СНиП.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ОПОРА_Х 7.16.16',desc:'Программа сбора нагрузок и расчёта фундаментов устоев и промежуточных опор автодорожных, железнодорожных и пешеходных мостов.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ФОК-ПК 2008',desc:'Комплекс проектирования фундаментов под колонны каркасных зданий на естественном, свайном забивном и свайном буронабивном основании.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ФОК-ПК Ленточный фундамент 2006',desc:'Комплекс проектирования (проверка) ленточных фундаментов на естественном и свайном основании под стены бескаркасных зданий.',tags:'Офисное ПО |Расчетное ПО'},
{name:'ФОК-ПК Парус 2006 ',desc:'Комплекс проектирования гравитационных подпорных стен и подпорных стен из буронабивных свай и шпунтов другой конструкции.',tags:'Офисное ПО |Расчетное ПО'},
{name:'Сборник НСИС ПБ',desc:'Нормативно-технические документы и нормативно-правовые акты в области ПБ, реестр сертифицированной продукции в ССОПБ.',tags:'Офисное ПО |Расчетное ПО'},
{name:'CPIPE 3.0',desc:'Программный комплекс для выполнения расчетов на прочность трубопроводов (в том числе и подземных).',tags:'Офисное ПО |Расчетное ПО'},
{name:'ПК “Проект-XXI” 2011',desc:'Инструмент для составления и проверки сметной документации на проектно-изыскательские работы.',tags:'Офисное ПО |Расчетное ПО'},
{name:'АРС-ПС 2007',desc:'Система расчёта теплопотерь, калориферов, отопления и вентиляции.',tags:'Офисное ПО |Расчетное ПО'},
       
        ],
    };
  },
  methods: {
    w: function(text){
      return w(text);
    },       
  }
}
</script>

<style>

</style>