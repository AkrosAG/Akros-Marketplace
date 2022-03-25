<script lang="jsx">
export default {
  props: ['fieldsToShow'],
  setup (props) {
    const fieldsToRender = []
    props.fieldsToShow.forEach(field => {
      switch(field.field_id) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 10:
        case 11:
        case 12:
        case 13:
        case 14:
          const element = <p>
            <select
              name="ad-sub-category"
              id="ad-sub-category"
              class="simple-field full-width uppercase"
            >
              <option disabled selected="">Type</option>
                {field.field_options.map((field) => {
                  return <option value={field.key}>{field.key}</option>
                })}
            </select> 
            </p>
            fieldsToRender.push(element)
            break;
        case 15:
        case 16:
        case 17:
        case 18:
        default:
          break;
      }
    })
    // use an array to return multiple root nodes
    return () => fieldsToRender
  },
}
</script>
