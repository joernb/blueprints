// import React from "react";
// import { Link as GatsbyLink, useStaticQuery, graphql } from "gatsby";
// import { FluidObject, FixedObject } from "gatsby-image";
// import Img from "gatsby-image/withIEPolyfill";
// import Layout from "./layout";
// import SEO from "./seo";
// import {
//   Grid,
//   Typography,
//   Button,
//   Box,
//   Card,
//   CardContent,
//   CardActions,
//   CardActionArea,
//   CardMedia,
//   Link,
//   Table,
//   TableRow,
//   TableHead,
//   TableCell,
//   TableBody,
//   Divider,
//   CardHeader,
//   ListItemText,
//   ListItemIcon,
//   ListItem,
//   List,
//   Tooltip,
// } from "@material-ui/core";

// import { makeStyles, CSSProperties } from "@material-ui/styles";
// import { StarBorder, Check, CheckCircle, Lock } from "@material-ui/icons";
// import theme from "../theme";

// interface Props {
//   features: Array<{
//     label: string;
//     tooltip: string;
//     plan: string[];
//   }>;
//   plan: string;
// }

// const FeatureList = ({ features, plan }: Props) => {
//   return (
//     <List>
//       {features.map(feature => {
//         // feature.plan.includes(plan)
//         const disabled = !feature.plan.includes(plan);
//         return (
//           <Tooltip
//             key={feature.label}
//             disableHoverListener={disabled}
//             disableFocusListener
//             disableTouchListener
//             title={feature.tooltip}
//           >
//             <ListItem button disabled={disabled}>
//               <ListItemIcon>{disabled ? <Lock /> : <Check />}</ListItemIcon>
//               <ListItemText>{feature.label}</ListItemText>
//             </ListItem>
//           </Tooltip>
//         );
//       })}
//     </List>
//   );
// };

// export default FeatureList;
