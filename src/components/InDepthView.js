import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { generateFormattedSkillText } from "./FormattedSkillText";
import { InDepthSkillList } from "./InDepthSkillList";
import Fade from "@material-ui/core/Fade";
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  Typography
} from "@material-ui/core";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

// Offset all anchors by -64 to account for a fixed header
// and scroll more quickly than the default 400ms
// configureAnchors({ offset: -64, scrollDuration: 200 });

/**
 * Render InDepthView.
 * Skill information is on the left while table of contents is on the right. If the user is on a mobile device, have table of contents on top instead.
 */
export default class InDepthView extends Component {
  render() {
    const {
      displayTableOfContents,
      skillObject,
      theme,
      isDesktop
    } = this.props;
    const skill = skillObject;
    const icon = skillObject.icon;
    return (
      <Grid
        wrap={"nowrap"}
        direction={!isDesktop ? "column-reverse" : "row"}
        container
        spacing={theme.spacing.unit * 3}
      >
        <Grid item md={2} />
        <Fade in={true}>
          <Grid item md={6}>
            {generateFormattedSkillText(skill, icon)}
          </Grid>
        </Fade>

        {/*Table of Contents*/}
        {displayTableOfContents && (
          <Grid item md={4}>
            {isDesktop ? (
              <div
                style={{
                  position: "fixed",
                  overflowY: "auto",
                  maxHeight: "85%",
                  padding: theme.spacing.unit * 2
                }}
              >
                {InDepthSkillList.generateTableOfContents(skill)}
              </div>
            ) : (
              <ExpansionPanel>
                <ExpansionPanelSummary>Contents</ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    {InDepthSkillList.generateTableOfContents(skill)}
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )}
          </Grid>
        )}
      </Grid>
    );
  }
}
