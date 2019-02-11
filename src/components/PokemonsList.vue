<template>
  <div class="fluid container">
    <div class="form-group form-group-lg panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Pokédex</h3>
      </div>
      <div class="panel-body">
        <div class="checkbox">
          <label><input v-model="editable" type="checkbox">Move pokemons</label>
        </div>
        <button type="button" class="btn btn-default" @click="orderList"><i class='fas fa-bowling-ball'>Lowest Number(First)</i></button>
        <SearchPokemon></SearchPokemon>
      </div>
    </div>

    <div class="col-md-3 one">
      <ul is="draggable" v-model="pokemonsList" class="list-group" :element="'ul'" :options="dragOptions" @start ="isDragging=true" @end="isDragging=false">
        <transition-group type="transition" name="flip-list">
          <li v-for="pokemon in pokemonsList" :key="pokemon.order" class="list-group-item">
            <i :class="pokemon.fixed? 'fas fa-anchor' : 'fas fa-broom'" aria-hidden="true" @click=" pokemon.fixed=! pokemon.fixed"></i>
            {{pokemon.name}}
            <span class="badge">{{ pokemon.order }}</span>
          </li>
        </transition-group>
      </ul>
    </div>

    <div class="col-md-3 two">
      <span is="draggable" v-model="pokemonsList2" :element="'span'" :options="dragOptions">
        <transition-group name="no" class="list-group" tag="ul">
          <li v-for="pokemon in pokemonsList2" :key="pokemon.order" class="list-group-item">
            <i :class="pokemon.fixed? 'fas fa-anchor' : 'fas fa-broom'" aria-hidden="true" @click=" pokemon.fixed=! pokemon.fixed"></i>
            {{pokemon.name}}
            <span class="badge">{{ pokemon.order }}</span>
          </li>
        </transition-group>
      </span>
    </div>

    <div class="list-group col-md-3 tree">
      <pre>{{ listString }}</pre>
    </div>

    <div class="list-group col-md-3 four">
      <pre>{{ list2String }}</pre>
    </div>
  </div>
</template>

<script>
// import GoPokemon from './GoPokemon';
import SearchPokemon from './SearchPokemon';
import draggable from 'vuedraggable';

// Component definition
export default {
  components: {
    // GoPokemon,
    SearchPokemon,
    draggable,
  },
  props: {
    pokemons: {
      type: Array,
    },
  },
  data(){
    return {
      pokemonsList2: [],
      editable: true,
      isDragging: false,
      delayedDragging: false,
    }
  },
  computed: {
    pokemonsList(){
      const newPokemonArray = this.pokemons.map((pokemon, index) => {
        return { name: pokemon.name, order: index + 1, fixed: false};
      });
      console.log(newPokemonArray);
      return newPokemonArray;
    },
    dragOptions(){
      return {
        animation: 0,
        group: "description",
        disabled: !this.editable,
        ghostClass: "ghost"
      };
    },
    listString() {
      return JSON.stringify(this.pokemonsList, null, 2);
    },
    list2String() {
      return JSON.stringify(this.pokemonsList2, null, 2);
    }
  },
  watch: {
    isDragging(newValue) {
      if(newValue){
        this.delayedDragging = true;
        return;
      }
      this.$nextTick(() => {
        this.delayedDragging = false;
      });
    },
  },
  methods: {
    orderList() {
      this.pokemonsList = this.pokemonsList.sort((one, two) => {
        return two.order - one.order;
      });
    },
    onMove({relatedContext, draggedContext}) {
       const relatedElement = relatedContext.pokemon;
       const draggedElement = draggedContext.pokemon;
       return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed);
   }
  }
}
</script>

<style>
  .flip-list-move {
    transition: transform 0.5s;
  }
  .no-move {
    transition: transform 0s;
  }
  .ghost {
    opacity: 0.5;
    background: #c8ebfb;
  }
  .list-group {
    min-height: 20px;
  }
  .list-group-item {
    cursor: move;
  }
  .list-group-item i {
    cursor: pointer;
  }
  .one {
    background-color: rgb(81, 81, 109);
    float: left;
    width: 50%;
  }
  .two {
    background-color: rgb(92, 116, 136);
    float: right;
    width: 50%;
  }
  .tree {
    background-color: rgb(141, 117, 137);
    float: left;
    width: 50%;
  }
  .four {
    background-color: rgb(96, 119, 101);
    float: right;
    width: 50%;
  }

</style>
