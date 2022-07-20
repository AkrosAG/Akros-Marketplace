# Liquibase migrations

## Structure

 - `liquibase.properties` - contains settings for liquibase
 - `db.changelog-main.yml` - main changelog file which describes where the changelog files are
 - `changelogs` - folder containing separate changelog files

## Changelog files

 - Liquibase orders the files by name, that's why a naming structure starting with `VX_XXX_name.yml` was used.
 - A single changelog file can have multiple changesets. Changesets are applied in the order they are in the file.
 - If there is a single changeset - use for id version from the file name
(for example if the file name is `V0_000_name.yml` id should be `V0_000`)
 - If there are multiple changesets - use for id version from the file name / incrementing index for the changests
(for example if the file name is `V0_000_name.yml` id for first changeset should be `V0_000/1`,
for second `V0_000/2`, for third `V0_000/3`)
 - guidance for version numbering and ids are not mandatory, but using same style for each change
will make debugging failing migrations easier