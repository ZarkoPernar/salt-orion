import {
  ColumnGroup,
  Grid,
  GridColumn,
  RowSelectionCheckboxColumn,
} from "@salt-ds/data-grid";

interface Investor {
  name: string;
  addedInvestors: string[];
  location: string;
  strategy: string[];
  cohort: string[];
  notes: string;
  amount: number;
}

const allLocations = [
  "New York, NY",
  "Jersey City, NJ",
  "Boston, MA",
  "San Francisco, CA",
];

function createDummyInvestors(): Investor[] {
  const a = [
    "Apple",
    "Orange",
    "Dragonfruit",
    "Coffee",
    "Fig",
    "Grape",
    "Hazelnut",
  ];
  const b = ["Investment", "Venture Capital", "Private Wealth"];
  const c = ["", "Inc."];
  const str = [
    ["FO"],
    ["PE"],
    ["VC"],
    ["FO", "PE"],
    ["FO", "PE", "VC"],
    ["VC", "PE"],
  ];
  const coh = [
    ["Potential Leads"],
    ["Top VCs"],
    ["Potential Leads", "Top VCs"],
  ];

  const investors: Investor[] = [];
  let i = 0;
  for (const x of a) {
    for (const y of b) {
      for (const z of c) {
        investors.push({
          name: [x, y, z].join(" "),
          addedInvestors: [],
          location: allLocations[i % allLocations.length],
          cohort: coh[i % coh.length],
          strategy: str[i % str.length],
          notes: "",
          amount: randomAmount(100, 300, 4),
        });
        ++i;
      }
    }
  }

  return investors;
}

const onAmountChange = (rowKey: string, rowIndex: number, value: string) => {
  dummyInvestors[rowIndex].amount = parseFloat(value);
};

const onLocationChange = (rowKey: string, rowIndex: number, value: string) => {
  dummyInvestors[rowIndex].location = value;
};

export function randomAmount(min = 0, max = 10000000, precision = 2) {
  const m = max * Math.pow(10, precision);
  const d = Math.pow(10, -precision);
  return Math.round(Math.random() * m) * d;
}

const dummyInvestors = createDummyInvestors();

const rowKeyGetter = (rowData: Investor) => rowData.name;

export const SmallTable = () => {
  return (
    <Grid
      rowData={dummyInvestors}
      rowKeyGetter={rowKeyGetter}
      style={{ height: 593 }}
      columnSeparators
    >
      <ColumnGroup id="groupOne" name="Group One" pinned="left">
        <RowSelectionCheckboxColumn id="rowSelection" />
        <GridColumn
          name="Name"
          id="name"
          defaultWidth={200}
          getValue={(x) => x.name}
        />
      </ColumnGroup>
      <ColumnGroup id="groupTwo" name="Group Two">
        <GridColumn
          name="Location"
          id="location"
          defaultWidth={150}
          getValue={(x: Investor) => x.location}
        />
        <GridColumn
          name="Cohort"
          id="cohort"
          defaultWidth={200}
          getValue={(x) => x.cohort}
        />
      </ColumnGroup>
      <ColumnGroup id="groupThree" name="Group Three">
        <GridColumn
          name="Amount"
          id="amount"
          defaultWidth={200}
          getValue={(x: Investor) => x.amount.toFixed(4)}
          align="right"
        />
      </ColumnGroup>
      <ColumnGroup id="groupFour" name="Group Four">
        <GridColumn
          name="Strategy"
          id="strategy"
          getValue={(x) => x.strategy.join(", ")}
        />
      </ColumnGroup>
    </Grid>
  );
};
